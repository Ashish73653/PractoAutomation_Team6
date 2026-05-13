const takePageScreenshot = async (filename, pageOrObject) => {
        // accept either a Playwright `page` or a page-wrapper object that exposes `.page`
        const page = pageOrObject

        if (!page) {
                throw new Error("No Playwright page provided to takePageScreenshot");
        }

        await page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
};

export { takePageScreenshot };