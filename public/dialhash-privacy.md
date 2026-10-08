# Privacy Policy

**Last updated:** October 8, 2026

## Introduction
This Privacy Policy describes how **shortCodes** (formerly **Dial Hash**, package name: `com.cobbold.dialhash`, "we," "our," or "the app") handles information when you use our mobile application.

shortCodes is an Android utility designed to help users in Ghana access quick USSD codes for mobile network operators (MTN, Telecel, AT) and banking services, with dual-SIM routing support and optional custom codes.

---

## Information Collection and Use
We do not collect, store, transmit, or share any personal information.

Our app is built with privacy as a foundational principle:
- We do **not** collect your name, email address, physical address, or phone number.
- We do **not** read, intercept, or upload your private SMS messages.
- We do **not** access or read your contacts or call logs.
- We do **not** record or listen to phone calls or USSD sessions.
- We do **not** record sensitive personal credentials (such as Mobile Money PINs or banking passwords).

---

## Data Storage

### Local Storage Only
All custom codes, favorites, and app preferences are stored locally on your device using Android's sandboxed Room and DataStore technologies. This data:
- Never leaves your device
- Is not transmitted to our servers
- Is not accessible to other apps or third parties
- Is automatically deleted when you uninstall the app or clear app data

### What We Store Locally
The app stores:
- **Favorite Codes:** The shortcodes you star for quick access.
- **Custom Codes (Premium):** Any custom shortcodes and labels you create.
- **SIM Card Preferences:** Your selected SIM card slot (SIM 1 or SIM 2) for specific operators to ensure seamless dialing.
- **App Settings:** Theme and display preferences.

This information is stored solely on your device and is used only to provide the app's functionality.

---

## Permissions

To provide its core USSD execution and dual-SIM management, the app requests the following standard Android permissions:

| Permission | Purpose |
| :--- | :--- |
| `android.permission.CALL_PHONE` | Allows you to execute USSD shortcodes directly from the app with a single tap rather than manually copying and typing them into the dialer. |
| `android.permission.READ_PHONE_STATE` | Used solely to detect available SIM card slots (SIM 1 vs. SIM 2) and carrier network names so USSD codes are routed through the intended carrier. |
| `android.permission.INTERNET` & `ACCESS_NETWORK_STATE` | Used to dynamically refresh the public USSD directory catalog from Firebase Firestore and load advertisements in the free version. |
| `com.google.android.gms.permission.AD_ID` | Standard Google Play Services permission enabling Google AdMob to deliver ads and prevent ad fraud. |

The app does **not** access:
- Your contacts
- Your location / GPS
- Your camera or microphone
- Your private photos, files, or media
- Your SMS messages or call history

---

## Third-Party Services

In the free version of the app, we utilize trusted third-party services for advertising, payment processing, and dynamic directory updates:

### 1. Google AdMob (Google LLC)
- Displays banner and interstitial advertisements in the free tier.
- May collect anonymous device identifiers, advertising ID (`AD_ID`), and general diagnostic logs in accordance with [Google's Privacy Policy](https://policies.google.com/privacy) and [AdMob Policies](https://support.google.com/admob/answer/6128543).
- We implement Google's User Messaging Platform (UMP) to obtain and manage user consent where required by applicable laws (including GDPR).

### 2. Google Play In-App Billing (Google LLC)
- We offer an optional one-time in-app purchase (**shortCodes Premium**) to permanently remove all advertisements and unlock custom codes and home screen widget features.
- All financial transactions and payment details are processed securely and exclusively by Google Play. We never receive, process, or store your credit card or payment information.

### 3. Firebase Firestore (Google Cloud)
- Delivers real-time updates to public USSD codes so users always have current network codes without needing full app updates. No personal data is stored on Firestore.

---

## How to Remove Ads & Tracking

You have full control over advertising:
1. **shortCodes Premium:** You can purchase the lifetime Premium upgrade inside the app, which completely disables all advertisements and stops advertising SDK requests.
2. **Device Advertising ID:** You can reset or delete your Android Advertising ID at any time via:  
   `Settings` &rarr; `Google` &rarr; `Ads` &rarr; `Delete advertising ID` (or `Reset advertising ID`).

---

## Data Security
Since all user data (favorites, custom codes, SIM preferences) is stored locally on your device, the security of your data depends on your device's security measures. We recommend:
- Keeping your device password-protected
- Installing official security updates
- Using device encryption if available

---

## Changes to Your Data
You have complete control over your data:
- Delete individual custom codes or unstar favorites at any time
- Reset remembered SIM card choices in the app's settings
- Clear all data or uninstall the app to permanently delete everything

---

## Children's Privacy
Our app does not knowingly collect any personal information from anyone, including children under 13. The app is safe for users of all ages.

---

## International Users & Compliance
This app complies with:
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Children's Online Privacy Protection Act (COPPA)
- Google Play Developer Program Policies

### Your Rights
Under applicable privacy laws, you have rights regarding your personal data. Because we do not collect, store, or sell personal data on any servers:
- **Right to Access:** There is no personal data held on our servers to access.
- **Right to Deletion:** All data can be cleared immediately within the app or by uninstalling.
- **Right to Portability:** All data remains on your device.
- **Right to Object:** No personal data processing occurs to object to.

---

## Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be reflected by updating the "Last updated" date at the top of this policy. We encourage you to review this policy periodically.

---

## Contact Us
If you have any questions about this Privacy Policy or our privacy practices, please contact us at:

- **Email:** augustinecobbold6@gmail.com  
- **Developer:** Augustine Cobbold

---

## Consent
By using shortCodes, you acknowledge that:
- You have read this Privacy Policy.
- You understand how permissions are used solely for dialing USSD codes and selecting SIM cards.
- All personal preferences are kept locally on your device.
