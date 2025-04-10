import { Grid } from '@mantine/core';
import { ServicePackage } from '../types';
import { ServicePackageCard } from './ServicePackageCard';

interface ServicePackageListProps {
  packages: ServicePackage[];
  onEdit: (pkg: ServicePackage) => void;
  onDelete: (id: string) => void;
}

export function ServicePackageList({ packages, onEdit, onDelete }: ServicePackageListProps) {
  return (
    <Grid>
      {packages.map((pkg) => (
        <Grid.Col key={pkg.id} span={{ base: 12, sm: 6, md: 4 }}>
          <ServicePackageCard 
            pkg={pkg} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </Grid.Col>
      ))}
    </Grid>
  );
} 