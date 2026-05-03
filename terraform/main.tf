terraform {
  required_version = ">= 1.7"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # GCSバックエンド（有効化する場合はコメントを外してbucket名を指定）
  # backend "gcs" {
  #   bucket = "tamado-tfstate"
  #   prefix = "terraform/state"
  # }
}

provider "google" {
  project               = var.project_id
  region                = var.region
  user_project_override = true
  billing_project       = var.project_id
}
