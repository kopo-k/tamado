# Cloud Identity Platform（Firebase Auth）を有効化
# identitytoolkit.googleapis.com は apis.tf で有効化済み
# Identity Platform の詳細設定（メール/パスワード認証の有効化）は
# GCPコンソールまたは firebase-tools で行う

# Identity Platform の設定（メール/パスワード認証）
resource "google_identity_platform_config" "default" {
  autodelete_anonymous_users = false

  sign_in {
    allow_duplicate_emails = false

    email {
      enabled           = true
      password_required = true
    }
  }

  depends_on = [google_project_service.apis]
}
