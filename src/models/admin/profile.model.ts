// Modelo para el perfil de admin

export interface AdminProfile {
  id: string;
  user_id: string;
  display_name: string;
  scope_notes: string;
  can_publish_direct: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProfileResponse {
  success: boolean;
  message: string;
  data: {
    admin_profile: AdminProfile;
  };
}

