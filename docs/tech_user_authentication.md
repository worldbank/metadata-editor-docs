# OpenID Connect (OIDC) authentication

*Audience: site administrators*

The Metadata Editor supports **OpenID Connect (OIDC)** login with external identity providers such as Microsoft Entra ID (Azure AD), Google, Auth0, Okta, and any OIDC-compliant provider.

This guide covers provider registration, application configuration, user provisioning, and troubleshooting. For end-user login behavior (profile, API keys), see [Login, logout, and password](/user_login.html). For roles after login, see [Managing users and roles](/tech_roles_permissions.html).

> **Not OIDC:** Local desktop builds may use **ZeroAuth** (one-click login without passwords). That is configured separately in `application/config/auth.php` and is not covered here.

---

## Table of contents

1. [Overview](#overview)
2. [Choose your setup](#choose-your-setup)
3. [Register the application with your provider](#register-the-application-with-your-provider)
4. [Application configuration](#application-configuration)
5. [Configuration reference](#configuration-reference)
6. [Provider examples](#provider-examples)
7. [Login page options](#login-page-options)
8. [User management after OIDC login](#user-management-after-oidc-login)
9. [Testing your configuration](#testing-your-configuration)
10. [Troubleshooting](#troubleshooting)
11. [Configuration checklist](#configuration-checklist)

---

## Overview

OIDC login works as follows:

1. The user opens the Metadata Editor login page and clicks the provider button (or is redirected to the provider when username/password login is hidden).
2. The browser is sent to the identity provider for authentication.
3. The provider redirects back to a **callback URL** on your Metadata Editor site.
4. The application validates the ID token, maps claims to a local user record, and creates a PHP session.

Configuration involves two files:

| File | Purpose |
|------|---------|
| `application/config/auth.php` | Selects the authentication **driver** (`OidcAuth` or `OidcAuthSpa`) |
| `application/config/auth_oidc.php` | OIDC provider settings (copy from `auth_oidc.php.example`; **gitignored**) |

---

## Choose your setup

The application provides two OIDC drivers. Choose one that matches how your identity provider registered the client.

| Setup | `authentication_driver` in `auth.php` | `client_type` in `auth_oidc.php` | Client secret | PKCE | Typical use |
|-------|--------------------------------------|----------------------------------|---------------|------|-------------|
| **Confidential (server-side)** | `OidcAuth` | `confidential` | Required | Optional (`use_pkce`) | Standard server deployment; secret stored on the PHP host |
| **Public (PKCE)** | `OidcAuthSpa` | `public` | Not used | Required | Public OAuth clients; authorization handled in the browser with PKCE |

**Recommendations**

- **Most server installations** with a web-confidential client → **`OidcAuth`** + `client_type` = `confidential`.
- **Public clients** (no client secret, PKCE-only) → **`OidcAuthSpa`** + `client_type` = `public` + `use_pkce` = `true`.

The driver and `client_type` must agree. Do not set `OidcAuth` with `client_type` = `public`, or the reverse.

### Callback URLs by driver

Register the exact callback URL in your identity provider. Use the URL your site generates (see [Redirect URIs and clean URLs](#redirect-uris-and-clean-urls)).

| Driver | Callback path (relative to site base) | Notes |
|--------|--------------------------------------|--------|
| **`OidcAuth`** (confidential) | `auth/callback` | Server-side token exchange |
| **`OidcAuthSpa`** (public) | `auth/oidc_callback_spa` | Browser receives the code; the app calls `auth/oidc_callback_api` to complete login |

If `redirect_uri` is left empty in `auth_oidc.php`, the application supplies a default. For **confidential** clients, set `redirect_uri` explicitly to your site's `auth/callback` URL to avoid mismatch with the provider registration.

---

## Register the application with your provider

### Step 1: Create an OIDC client

In your provider's admin console, register a new application (or client) with:

- **Application type:** Web application (confidential) or public/native client (public/PKCE), matching [Choose your setup](#choose-your-setup).
- **Response type:** Authorization code (`code`).
- **Scopes:** at minimum `openid`, `profile`, and `email` (or equivalent claims that include an email address).

### Step 2: Configure the redirect URI

Add the callback URL for your driver (see table above). Examples:

**Confidential (`OidcAuth`)** — with URL rewriting (no `index.php`):

```
https://your-domain.example.org/auth/callback
```

**Public (`OidcAuthSpa`):**

```
https://your-domain.example.org/auth/oidc_callback_spa
```

**Without URL rewriting** (CodeIgniter default), include `index.php`:

```
https://your-domain.example.org/index.php/auth/callback
```

### Step 3: Obtain credentials

From the provider, note:

- **Issuer URL** (for OpenID discovery)
- **Client ID**
- **Client secret** (confidential clients only)

### Redirect URIs and clean URLs

The Metadata Editor builds callback URLs with CodeIgniter's `site_url()`. The path depends on your web server:

- **Clean URLs enabled** — paths look like `/auth/callback`.
- **Default CodeIgniter** — paths include `/index.php/`.

The redirect URI registered at the identity provider must **exactly** match what the application sends. When in doubt, start a test login, inspect the `redirect_uri` query parameter on the provider's authorization page, and register that value.

---

## Application configuration

### Step 1: Create `auth_oidc.php`

From the application root:

```bash
cp application/config/auth_oidc.php.example application/config/auth_oidc.php
```

Edit `auth_oidc.php` with your provider settings. This file is listed in `.gitignore` — do not commit secrets to version control.

### Step 2: Enable an OIDC driver

In `application/config/auth.php`, set the active driver:

**Confidential server-side client:**

```php
$config['authentication_driver'] = 'OidcAuth';
```

**Public client (PKCE):**

```php
$config['authentication_driver'] = 'OidcAuthSpa';
```

Leave `DefaultAuth` unchanged if OIDC is disabled (`oidc_auth['enabled']` => `false`).

### Step 3: Configure OIDC settings

Edit `application/config/auth_oidc.php`. Minimal **confidential** example:

```php
$config['oidc_auth'] = array(
    'enabled' => true,
    'show_default_login' => true,
    'provider_name' => 'Login with your organization',
    'provider_icon' => '',
    'issuer' => 'https://login.microsoftonline.com/{tenant-id}/v2.0',
    'client_type' => 'confidential',
    'use_pkce' => false,
    'client_id' => 'your-client-id',
    'client_secret' => 'your-client-secret',
    'redirect_uri' => 'https://your-domain.example.org/auth/callback',
    'response_type' => 'code',
    'response_mode' => 'query',
    'scopes' => 'openid profile email',
    'prompt' => 'select_account',
    'auto_register' => true,
    'logout_endpoint' => true,
    'validate_nonce' => true,
    'validate_state' => true,
    'claim_mappings' => array(
        'email' => 'email',
        'first_name' => 'given_name',
        'last_name' => 'family_name',
        'username' => 'preferred_username',
    ),
);
```

Minimal **public (PKCE)** example:

```php
$config['oidc_auth'] = array(
    'enabled' => true,
    'show_default_login' => true,
    'provider_name' => 'Login with your organization',
    'issuer' => 'https://your-tenant.us.auth0.com',
    'client_type' => 'public',
    'use_pkce' => true,
    'client_id' => 'your-client-id',
    'client_secret' => '',
    'redirect_uri' => 'https://your-domain.example.org/auth/oidc_callback_spa',
    'response_type' => 'code',
    'response_mode' => 'query',
    'scopes' => 'openid profile email',
    'prompt' => 'select_account',
    'auto_register' => true,
    'logout_endpoint' => true,
    'validate_nonce' => true,
    'validate_state' => true,
);
```

---

## Configuration reference

| Option | Description | Required |
|--------|-------------|----------|
| `enabled` | Enable OIDC login | Yes |
| `show_default_login` | When `true`, show username/password form alongside the OIDC button | No |
| `provider_name` | Label on the OIDC login button | Yes (when enabled) |
| `provider_icon` | Optional image URL for the button | No |
| `issuer` | OIDC issuer URL used for discovery (`/.well-known/openid-configuration`) | Yes |
| `client_type` | `confidential` or `public`; must match the driver | Yes |
| `use_pkce` | PKCE for the authorization flow; required for public clients | Yes for public |
| `client_id` | OAuth client ID from the provider | Yes |
| `client_secret` | OAuth client secret; required for confidential clients | Confidential only |
| `redirect_uri` | Callback URL; should match provider registration (see [Callback URLs](#callback-urls-by-driver)) | Recommended |
| `response_type` | Use `code` (authorization code flow) | No |
| `response_mode` | `query`, `form_post`, or `fragment` | No |
| `scopes` | Space-separated scopes (typically `openid profile email`) | No |
| `prompt` | OIDC `prompt` parameter; default `select_account` forces account picker; set to empty to omit | No |
| `claim_mappings` | Map ID token claims to local `email`, `first_name`, `last_name`, `username` | No |
| `auto_register` | Create local users automatically on first OIDC login | No |
| `logout_endpoint` | After local logout, redirect to provider end-session URL when available | No |
| `validate_nonce` | Validate nonce in the ID token | No |
| `validate_state` | Validate OAuth state (CSRF protection) | No |

### Custom claim mappings

If your provider uses non-standard claim names:

```php
'claim_mappings' => array(
    'email' => 'email',
    'first_name' => 'given_name',
    'last_name' => 'family_name',
    'username' => 'preferred_username',
    // Examples for non-standard providers:
    // 'first_name' => 'firstname',
    // 'last_name' => 'surname',
),
```

Email is required. If the mapped email claim is missing, login fails.

---

## Provider examples

Replace placeholders with your tenant, domain, and credentials. Set `redirect_uri` to your actual callback URL.

### Microsoft Entra ID (Azure AD) — confidential

Use with `OidcAuth` and `client_type` => `confidential`.

```php
'provider_name' => 'Login with Microsoft',
'issuer' => 'https://login.microsoftonline.com/{tenant-id}/v2.0',
'client_type' => 'confidential',
'client_id' => 'your-azure-client-id',
'client_secret' => 'your-azure-client-secret',
'redirect_uri' => 'https://your-domain.example.org/auth/callback',
'response_mode' => 'query',
'scopes' => 'openid profile email',
```

Some Entra configurations require `response_mode` => `form_post`.

### Google — confidential

```php
'provider_name' => 'Login with Google',
'issuer' => 'https://accounts.google.com',
'client_type' => 'confidential',
'client_id' => 'your-google-client-id',
'client_secret' => 'your-google-client-secret',
'redirect_uri' => 'https://your-domain.example.org/auth/callback',
'scopes' => 'openid profile email',
```

### Auth0 — public (PKCE)

Use with `OidcAuthSpa` and `client_type` => `public`.

```php
'provider_name' => 'Login with Auth0',
'issuer' => 'https://your-tenant.us.auth0.com',
'client_type' => 'public',
'use_pkce' => true,
'client_id' => 'your-auth0-client-id',
'client_secret' => '',
'redirect_uri' => 'https://your-domain.example.org/auth/oidc_callback_spa',
'scopes' => 'openid profile email',
```

### Okta — confidential

```php
'provider_name' => 'Login with Okta',
'issuer' => 'https://your-domain.okta.com',
'client_type' => 'confidential',
'client_id' => 'your-okta-client-id',
'client_secret' => 'your-okta-client-secret',
'redirect_uri' => 'https://your-domain.example.org/auth/callback',
'scopes' => 'openid profile email',
```

---

## Login page options

### Dual login (OIDC + username/password)

```php
'show_default_login' => true,
```

Users see the OIDC button and the standard email/password form (with captcha). Useful during migration or for break-glass local accounts.

### OIDC only

```php
'show_default_login' => false,
```

**Confidential (`OidcAuth`):** users visiting the login page are redirected to the identity provider automatically.

**Public (`OidcAuthSpa`):** only the OIDC button is shown; users must click it to start PKCE login (no automatic redirect).

### Customize the provider button

```php
'provider_name' => 'Login with Your Organization',
'provider_icon' => 'https://example.org/logo.png',
```

---

## User management after OIDC login

### Matching existing users

Login matches on **email address**. If a user with the same email already exists and is **active**, they are signed in to that account.

### Automatic registration

When `auto_register` is `true` and no user exists for the email:

1. A local account is created with a random password (authentication remains via OIDC).
2. The account is created **active** (`active` = 1).
3. **Default roles** from site configuration are applied via `set_user_default_roles()` (see [Managing users and roles](/tech_roles_permissions.html)).

When `auto_register` is `false`, unknown users receive an error and must be provisioned manually by an administrator before they can log in.

### Permissions and activation

OIDC auto-registration does **not** bypass project-level permissions. New users receive only the site's default global roles until an administrator shares projects or adjusts roles.

Manual signup flows may require administrator activation; OIDC auto-registered users are active immediately. Pre-provision users in the admin UI if you need to assign roles before first login.

### Logout

When `logout_endpoint` is `true`, logout attempts to redirect to the provider's end-session endpoint after clearing the local session. If discovery does not expose logout or the redirect fails, the user is returned to the site home page.

---

## Testing your configuration

1. **Verify files** — `auth.php` driver matches `client_type`; `auth_oidc.php` exists and `enabled` is `true`.
2. **Verify redirect URI** — matches the IdP registration exactly (scheme, host, path, and `index.php` if used).
3. **Test login** — open the login page, complete provider authentication, confirm redirect back and an active session.
4. **Test new user** — with `auto_register` enabled, log in with an account that has no local user; confirm the user appears in Site administration and has expected default roles.
5. **Test logout** — confirm local and (if configured) provider logout behavior.

---

## Troubleshooting

### Redirect URI mismatch

**Symptom:** Provider error such as `redirect_uri_mismatch`.

**Fix:** Compare the URI registered at the provider with the `redirect_uri` in `auth_oidc.php` (or the default sent in the authorization request). Include or omit `index.php` consistently. Use [Clean URLs](/tech_installation_clean_urls.html) documentation if enabling rewrite rules.

### 404 on callback

**Symptom:** Browser lands on a 404 after provider login.

**Fix:** Confirm the path matches the driver:

- Confidential → `auth/callback` (not `auth/oidc_callback`)
- Public → `auth/oidc_callback_spa`

### Invalid state or session expired

**Symptom:** "Invalid state parameter" or "Session expired" after callback.

**Fix:** Ensure cookies work on your domain (HTTPS recommended). Check that load balancers preserve session affinity. Avoid opening the callback in a different browser profile than the one that started login.

### Email not found in claims

**Symptom:** "Email not found in OIDC claims".

**Fix:** Request `email` scope. Adjust `claim_mappings` if the provider uses a different claim. Confirm the IdP returns email for the test user.

### User not found and auto-registration disabled

**Symptom:** "User not found and auto-registration is disabled".

**Fix:** Set `auto_register` => `true`, or create the user manually in Site administration before OIDC login.

### Discovery or issuer errors

**Symptom:** Errors fetching the discovery document or invalid issuer.

**Fix:** Verify `issuer` URL (no trailing path errors; use the provider's documented issuer, often ending in `/v2.0` for Entra). Ensure the server can reach the issuer over HTTPS (outbound firewall).

### Login succeeds but user has no access

**Fix:** OIDC only authenticates identity. Assign roles and project sharing in [Managing users and roles](/tech_roles_permissions.html).

### Application logs

Check `logs/log-YYYY-MM-DD.php` for messages containing `OIDC` or `OidcClient`.

---

## Configuration checklist

- [ ] OIDC application registered at the identity provider
- [ ] Client ID obtained; client secret obtained (confidential clients)
- [ ] Redirect URI registered at provider matches driver (`auth/callback` or `auth/oidc_callback_spa`)
- [ ] `application/config/auth_oidc.php` created from example (not committed to git)
- [ ] `oidc_auth['enabled']` set to `true`
- [ ] `authentication_driver` set to `OidcAuth` or `OidcAuthSpa` in `auth.php`
- [ ] `client_type` aligned with driver
- [ ] `issuer`, `client_id`, and scopes configured
- [ ] Login flow tested
- [ ] New user registration tested (if `auto_register` enabled)
- [ ] Default roles verified for auto-registered users
- [ ] Logout tested

---

## Provider documentation

- [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc)
- [Google OpenID Connect](https://developers.google.com/identity/protocols/oauth2/openid-connect)
- [Auth0 OIDC](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol)
- [Okta OIDC](https://developer.okta.com/docs/guides/implement-oauth-for-okta/)
