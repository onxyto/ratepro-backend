import { HealthRiskEnum } from 'src/shared/enums/health-risk.enum';

export interface IngredientDto {
  name: string;
  riskRate: number;
  healthRisk: HealthRiskEnum;
  description: string;
  scientificResources: string;
}
