"use client";

import { useEffect } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  setAnalyticsCollectionEnabled,
  setUserId,
  setUserProperties,
  type Analytics
} from "firebase/analytics";
import { setAnalyticsAdapter, type AnalyticsPayload } from "@/lib/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
const enableInDev = process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_IN_DEV === "true";
const debugLogs = process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_DEBUG === "true";
const ANON_USER_ID_KEY = "analytics_anon_user_id";
const FIRST_SEEN_KEY = "analytics_first_seen_at";
const SESSION_ID_KEY = "analytics_session_id";
const SESSION_START_KEY = "analytics_session_started_at";

function getProperties(properties?: AnalyticsPayload["properties"]) {
  if (!properties) return undefined;
  return Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined));
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateAnonIdentity() {
  const existing = window.localStorage.getItem(ANON_USER_ID_KEY);
  if (existing) {
    const firstSeen = window.localStorage.getItem(FIRST_SEEN_KEY) || new Date().toISOString();
    if (!window.localStorage.getItem(FIRST_SEEN_KEY)) {
      window.localStorage.setItem(FIRST_SEEN_KEY, firstSeen);
    }
    return { anonUserId: existing, firstSeenAt: firstSeen, isReturning: true };
  }

  const anonUserId = createId();
  const firstSeenAt = new Date().toISOString();
  window.localStorage.setItem(ANON_USER_ID_KEY, anonUserId);
  window.localStorage.setItem(FIRST_SEEN_KEY, firstSeenAt);
  return { anonUserId, firstSeenAt, isReturning: false };
}

function getOrCreateSession() {
  const existing = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (existing) return { sessionId: existing, isNewSession: false };
  const sessionId = createId();
  window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  window.sessionStorage.setItem(SESSION_START_KEY, new Date().toISOString());
  return { sessionId, isNewSession: true };
}

function initFirebaseAnalytics(): Analytics | null {
  if (!firebaseConfig.apiKey || !firebaseConfig.appId || !firebaseConfig.projectId || !firebaseConfig.measurementId) {
    if (debugLogs) {
      console.warn("[analytics] Firebase config missing required fields", {
        hasApiKey: Boolean(firebaseConfig.apiKey),
        hasAppId: Boolean(firebaseConfig.appId),
        hasProjectId: Boolean(firebaseConfig.projectId),
        hasMeasurementId: Boolean(firebaseConfig.measurementId)
      });
    }
    return null;
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAnalytics(app);
}

export function FirebaseAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !enableInDev) return;

    let cancelled = false;

    void isSupported().then((supported) => {
      if (debugLogs) {
        console.info("[analytics] isSupported:", supported);
      }
      if (!supported || cancelled) return;
      const analytics = initFirebaseAnalytics();
      if (!analytics) return;
      setAnalyticsCollectionEnabled(analytics, true);
      const identity = getOrCreateAnonIdentity();
      const session = getOrCreateSession();
      setUserId(analytics, identity.anonUserId);
      setUserProperties(analytics, {
        visitor_type: identity.isReturning ? "returning" : "new",
        first_seen_at: identity.firstSeenAt
      });

      setAnalyticsAdapter({
        track: (event) => {
          const props: Record<string, string | number | boolean> = {
            anon_user_id: identity.anonUserId,
            session_id: session.sessionId,
            visitor_type: identity.isReturning ? "returning" : "new",
            ...(getProperties(event.properties) || {})
          };
          if (debugLogs) {
            props.debug_mode = true;
          }
          if (debugLogs) {
            // Helpful for local verification in browser devtools.
            console.info("[analytics]", `app_${event.name}`, props);
          }
          logEvent(analytics, `app_${event.name}`, props);
        }
      });

      const bootProps: Record<string, string | boolean> = {
        source: "firebase_analytics_init",
        anon_user_id: identity.anonUserId,
        session_id: session.sessionId,
        visitor_type: identity.isReturning ? "returning" : "new",
        new_session: session.isNewSession
      };
      if (debugLogs) bootProps.debug_mode = true;
      logEvent(analytics, "app_analytics_boot", bootProps);
    });

    return () => {
      cancelled = true;
      setAnalyticsAdapter({ track: () => undefined });
    };
  }, []);

  return null;
}
