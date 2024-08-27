const EMAIL_PROVIDER_1 = 'provider1';
const EMAIL_PROVIDER_2 = 'provider2';

class EmailService {
    constructor() {
        this.providers = {
            [EMAIL_PROVIDER_1]: this.mockSendEmail.bind(this, EMAIL_PROVIDER_1),
            [EMAIL_PROVIDER_2]: this.mockSendEmail.bind(this, EMAIL_PROVIDER_2)
        };
        this.retryAttempts = 3;
        this.retryDelay = 1000; // initial delay in ms
        this.rateLimit = 5; // emails per minute
        this.lastSendTime = 0;
    }

    async sendEmail(to, subject, body, id) {
        this.checkRateLimit();

        const emailData = { to, subject, body, id };

        for (const provider of [EMAIL_PROVIDER_1, EMAIL_PROVIDER_2]) {
            try {
                return await this.sendWithRetry(provider, emailData);
            } catch (error) {
                console.error(`Failed with provider ${provider}:`, error.message);
            }
        }

        throw new Error('All providers failed.');
    }

    async sendWithRetry(provider, emailData) {
        let attempts = 0;
        let delay = this.retryDelay;

        while (attempts < this.retryAttempts) {
            try {
                await this.providers[provider](emailData);
                console.log(`Email sent successfully with provider ${provider}`);
                return;
            } catch (error) {
                attempts++;
                if (attempts >= this.retryAttempts) {
                    throw new Error(`Failed to send email after ${attempts} attempts`);
                }
                await this.sleep(delay);
                delay *= 2; // Exponential backoff
            }
        }
    }

    async mockSendEmail(provider, { to, subject, body, id }) {
        // Mock function to simulate sending email
        if (Math.random() < 0.7) {
            throw new Error(`Simulated failure with ${provider}`);
        }
        console.log(`Mock email sent to ${to} via ${provider}`);
    }

    checkRateLimit() {
        const now = Date.now();
        if (now - this.lastSendTime < 60000 / this.rateLimit) {
            throw new Error('Rate limit exceeded');
        }
        this.lastSendTime = now;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Example usage:
(async () => {
    const emailService = new EmailService();

    try {
        await emailService.sendEmail('test@example.com', 'Subject', 'Body content', 'unique-id-123');
    } catch (error) {
        console.error('Email sending failed:', error.message);
    }
})();
