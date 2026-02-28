import { apiVersion, dataset, projectId } from "./env";
import { createStudioConfig } from "./studio-config";

export default createStudioConfig({ projectId, dataset, apiVersion });
