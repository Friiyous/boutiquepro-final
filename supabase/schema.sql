-- TABLE : boutiques
CREATE TABLE boutiques (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  couverture_url TEXT,
  adresse TEXT,
  ville VARCHAR(50) DEFAULT 'Abidjan',
  quartier VARCHAR(50),
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  categories TEXT[],
  frais_livraison INTEGER DEFAULT 1000,
  delai_livraison INTEGER DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- TABLE : produits
CREATE TABLE produits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  boutique_id UUID REFERENCES boutiques(id) ON DELETE CASCADE,
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  prix INTEGER NOT NULL,
  prix_promo INTEGER,
  images TEXT[],
  categorie VARCHAR(50),
  sous_categorie VARCHAR(50),
  stock INTEGER DEFAULT 0,
  sku VARCHAR(50),
  tags TEXT[],
  vendus INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE : clients
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  boutique_id UUID REFERENCES boutiques(id),
  nom VARCHAR(100),
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  adresse TEXT,
  quartier VARCHAR(50),
  commandes_total INTEGER DEFAULT 0,
  montant_total INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE : commandes
CREATE TABLE commandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code_commande VARCHAR(20) UNIQUE NOT NULL,
  boutique_id UUID REFERENCES boutiques(id),
  client_id UUID REFERENCES clients(id),
  produits JSONB NOT NULL,
  sous_total INTEGER NOT NULL,
  frais_livraison INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  statut VARCHAR(20) DEFAULT 'en_attente',
  adresse_livraison TEXT,
  telephone_livraison VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE : paiements
CREATE TABLE paiements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  commande_id UUID REFERENCES commandes(id),
  methode VARCHAR(20) NOT NULL,
  montant INTEGER NOT NULL,
  numero_telephone VARCHAR(20),
  transaction_id VARCHAR(100),
  statut VARCHAR(20) DEFAULT 'en_attente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE : livraisons
CREATE TABLE livraisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  commande_id UUID REFERENCES commandes(id),
  code_suivi VARCHAR(20) UNIQUE NOT NULL,
  livreur_nom VARCHAR(100),
  livreur_telephone VARCHAR(20),
  statut VARCHAR(20) DEFAULT 'en_preparation',
  date_livraison_estimee TIMESTAMP WITH TIME ZONE,
  date_livraison_reelle TIMESTAMP WITH TIME ZONE,
  position_lat DECIMAL,
  position_lng DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
