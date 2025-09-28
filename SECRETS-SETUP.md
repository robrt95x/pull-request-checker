# GitHub Repository Secrets Setup

This file explains how to set up the required secrets for Claude Code GitHub Actions.

## Required Secrets

### ANTHROPIC_API_KEY
Your Claude API key from Anthropic console.

**How to add:**
1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `ANTHROPIC_API_KEY`
6. Value: Your actual Claude API key (starts with `sk-ant-`)
7. Click **Add secret**

## Getting Your API Key

1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy the generated key (it starts with `sk-ant-`)

## Security Notes

⚠️ **Never commit API keys to your repository!**
✅ Always use GitHub Secrets for sensitive data
🔒 Secrets are encrypted and only accessible to GitHub Actions
👥 Repository collaborators cannot view secret values

## Verification

After adding the secret, you can verify it's working by:
1. Creating a test PR
2. Checking if the Claude review action runs successfully
3. Looking for any authentication errors in the Actions logs

## Troubleshooting

If you get authentication errors:
- Verify the secret name is exactly `ANTHROPIC_API_KEY`
- Ensure the API key is valid and has sufficient credits
- Check if the key was copied correctly (no extra spaces)
- Verify your API key has the necessary permissions

## Cost Management

To manage API costs:
- Set usage alerts in your Anthropic console
- Use specific commands (`@claude /security`) instead of general reviews
- Configure appropriate `max-turns` in workflow files
- Monitor token usage in your Anthropic dashboard
