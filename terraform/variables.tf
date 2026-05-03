variable "project_id" {
  description = "GCPプロジェクトID"
  type        = string
}

variable "region" {
  description = "デプロイリージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "database_url" {
  description = "NeonのPostgreSQL接続文字列（terraform.tfvarsで設定）"
  type        = string
  sensitive   = true
}
