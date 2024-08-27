# Resilient Email Sending Service
# Overview
This project provides a resilient email sending service implemented in JavaScript. The service is designed to handle email sending through two mock providers with robust retry logic, 
fallback mechanisms, idempotency, rate limiting, and status tracking.

# Features
1. Retry Logic with Exponential Backoff: Automatically retries sending emails with increasing delays.
2. Fallback Mechanism: Switches to a secondary provider if the primary provider fails.
3. Idempotency: Ensures that emails with the same unique ID are not sent multiple times.
4. Rate Limiting: Prevents sending too many emails in a short period.
5. Status Tracking: Logs the status of email sending attempts for troubleshooting.

# Assumptions
1. Environment: The service is designed to run in a Node.js environment.
2. Mock Providers: The email providers used in this example are mock implementations. Replace these with actual email service APIs (e.g., SendGrid, Mailgun) for production use.
3. Unique Email IDs: Each email should have a unique ID to ensure idempotency.
4. Basic Rate Limiting: The rate limiter is implemented with a simple interval check. Adjust the rate limit and other parameters based on actual usage requirements.

# Setup Instructions
Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.

