# バックエンド用サービスアカウント
resource "google_service_account" "backend" {
  account_id   = "tamado-backend-sa"
  display_name = "tamado Backend Service Account"
}

# フロントエンド用サービスアカウント
resource "google_service_account" "frontend" {
  account_id   = "tamado-frontend-sa"
  display_name = "tamado Frontend Service Account"
}

# GitHub Actions用サービスアカウント（CI/CDデプロイ）
resource "google_service_account" "github_actions" {
  account_id   = "tamado-github-actions-sa"
  display_name = "tamado GitHub Actions Service Account"
}

# バックエンドSA: Secret Manager読み取り権限
resource "google_project_iam_member" "backend_secret" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.backend.email}"
}

# GitHub Actions SA: Artifact Registryへのプッシュ権限
resource "google_project_iam_member" "github_registry" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# GitHub Actions SA: Cloud Runデプロイ権限
resource "google_project_iam_member" "github_run" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# GitHub Actions SA: サービスアカウントの使用権限（--service-accountで指定したSAを使うため）
resource "google_project_iam_member" "github_sa_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# GitHub Actions SA: Secret Manager読み取り権限（マイグレーション時にDATABASE_URLを取得するため）
resource "google_project_iam_member" "github_secret" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}
