import { Helmet } from 'react-helmet-async';
import EquipmentManager from '@/components/EquipmentManager';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dragon's Dogma Equipment Manager | Dark Arisen Armory</title>
        <meta 
          name="description" 
          content="Browse, compare, and manage your Dragon's Dogma: Dark Arisen equipment. Search weapons and armor by vocation, stats, and elemental properties." 
        />
        <meta property="og:title" content="Dragon's Dogma Equipment Manager" />
        <meta property="og:description" content="Complete armory database for Dragon's Dogma: Dark Arisen" />
      </Helmet>
      <EquipmentManager />
    </>
  );
};

export default Index;
