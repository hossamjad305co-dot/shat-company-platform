// SHAT Platform — Drive Status Card Component (components/academy/DriveStatusCard.js)
import { IntegrationStatusCard } from '../ui/core.js';
import { getDriveIntegrationStatus } from '../../services/files/fileService.js';

export function DriveStatusCard() {
  const status = getDriveIntegrationStatus();
  return IntegrationStatusCard({
    provider: status.provider,
    configured: status.configured,
    statusText: status.status,
    message: status.message
  });
}
