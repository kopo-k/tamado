resource "google_artifact_registry_repository" "tamado" {
  repository_id = "tamado"
  format        = "DOCKER"
  location      = var.region
  description   = "tamadoアプリのDockerイメージ"

  depends_on = [google_project_service.apis]
}
