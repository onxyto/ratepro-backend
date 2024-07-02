import { HealthRiskEnum } from '../../shared/enums/health-risk.enum';

export interface IngredientDto {
  name: string;
  riskRate: number;
  healthrisk: HealthRiskEnum;
  description: string;
  scientificResources: string;
}
