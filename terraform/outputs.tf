output "artifact_registry" {
  description = "Artifact RegistryのDockerイメージベースパス"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/tamado"
}

output "github_actions_sa_email" {
  description = "GitHub ActionsのサービスアカウントEmail（GCP_SA_KEYの発行先）"
  value       = google_service_account.github_actions.email
}

output "backend_sa_email" {
  description = "バックエンドのサービスアカウントEmail（deploy.ymlの--service-accountに使う）"
  value       = google_service_account.backend.email
}

output "frontend_sa_email" {
  description = "フロントエンドのサービスアカウントEmail（deploy.ymlの--service-accountに使う）"
  value       = google_service_account.frontend.email
}
