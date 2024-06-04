const puppeteer = require('puppeteer');

describe('Front-end Integration/Features', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/');
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(() => {
        browser.close();
    });

    describe('Initial display', () => {
        it('log in page loads successfully', async () => {
            await page.waitForSelector('h2');
            const title = await page.$eval('h2', el => el.innerHTML);
            expect(title).toBe('Occasio');

            const loginButton = await page.$('.login-btn');
            expect(loginButton).not.toBeNull();
        });
    });

    describe('Login functionality', () => {
        it('should display error message for incorrect login', async () => {
            await page.waitForSelector('form');
            await page.type('input[name=email]', '12345');
            await page.type('input[name=password]', '12345');
            await page.click('button[type=submit]');

            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 3000 })
                .catch(e => console.log('No redirection as expected with wrong credentials'));

            await page.waitForSelector('.error');
            const errorMessage = await page.$eval('.error', el => el.innerHTML);
            expect(errorMessage).toContain('Incorrect username or password');
        })

        it('should redirect user to home page for correct login', async () => {
            await page.waitForSelector('form');
            await page.type('input[name=email]', 'trangyz@gmail.com');
            await page.type('input[name=password]', 'trangyz');
            await page.click('button[type=submit]');

            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            const url = await page.url();
            expect(url).toBe('http://localhost:8080/home');

            await page.waitForSelector('h3');
            const title = await page.$eval('h3', el => el.innerHTML);
            expect(title).toContain('My Events');
        })
    })
})
