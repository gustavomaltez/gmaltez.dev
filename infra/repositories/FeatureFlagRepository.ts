import { Feature } from '@flags';

export abstract class FeatureFlagRepository {
  abstract isEnabled(feature: Feature): Promise<boolean>;
}
