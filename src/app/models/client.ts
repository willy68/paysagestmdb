export interface Client {
  id?: number;
  entreprise_id?: number;
  code_client?: string;
  civilite?: string;
  nom?: string;
  prenom?: string;
  tel?: string;
  portable?: string;
  email?: string;
  tva_intracom?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}
