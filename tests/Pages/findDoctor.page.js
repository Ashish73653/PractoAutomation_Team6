const  data = require('../test-data/data.json');

class findDoctor{
    constructor(page){
          this.page = page
          // Core navigation and search controls
          this.findDoctor = page.locator('//a[.="Find Doctors"]')
          this.location = page.locator('(//input[@class="c-omni-searchbox c-omni-searchbox--large"])[1]')
          this.inputField = page.getByPlaceholder("Search doctors, clinics, hospitals, etc.")
          this.dropdownSelect = page.locator('#c-omni-container').getByText('Dentist', { exact: true })
          this.gender = page.getByRole('button', { name: 'Gender' })
          this.female = page.getByText('Female Doctor')
          this.experience = page.getByRole('button', { name: 'Experience' })
          this.experienceOption = page.getByText('5+ Years of experience', { exact: true })
          this.sortBy =  page.getByRole('button', { name: 'Click to view all sorting' })
          this.lowestPrice = page.getByText('Consultation Fee - Low to High', { exact: true })
          this.drName = page.locator('[data-qa-id="doctor_name"]').nth(1);
          this.bookAppointmentBtn = page.locator('button[data-qa-id="book_appointment"], button:has-text("Book Clinic Visit"), button:has-text("Book Appointment")').first()
            // Appointment calendar and slot selectors
            this.days = page.locator('[data-qa-id="date_selector"]');
            this.slots = page.locator('[data-qa-id="slot_time"]');
          this.emailInput = page.getByPlaceholder("Enter Your Email ID (Optional)")
          this.whatsappNotification = page.locator("#whatsapp")
    }
        async clickOnFindDoctor(){
        await this.findDoctor.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.findDoctor.click();
        }
        async enterLocation(location){
        await this.location.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.location.fill(location);
        }
        async enterSpeciality(name){
        await this.inputField.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.inputField.fill(name);
        }
        async selectSpeciality(){
         await this.dropdownSelect.click()
        }
        async selectGender(gender){
        await this.gender.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.gender.click();
        }   
        async selectFemale(){
        await this.female.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.female.click();
        }
        async selectExperience(experience){
        await this.page.waitForLoadState('load');
        await this.experience.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.experience.click();
        }
        async selectExperienceOption(experienceOption){
        await this.experienceOption.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.experienceOption.first().click();
        }
        async selectSortBy(option){
        await this.page.waitForLoadState('load');
        await this.sortBy.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.sortBy.click();
        }
        async selectLowestPrice(){
        await this.lowestPrice.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.lowestPrice.click();
        }
        async clickOnDoctor(){
        await this.page.waitForLoadState('load');
        await this.drName.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.drName.click();
        }
        async bookDoctor(){
        await this.bookAppointmentBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.bookAppointmentBtn.click();
        }
        async enterEmail(email){
        await this.emailInput.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.emailInput.fill(email);
        }   
        async disableWhatsappNotification(){
        await this.whatsappNotification.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.whatsappNotification.click();
        }  
        
        //function for selecting time slots dynamically without fail through traversing each
        //  available day and checking for available slots
        async selectFirstAvailableTimeSlot() {
            // Walk through days to pick the first available time slot
        const dayCount = await this.days.count();
        for (let i = 0; i < dayCount; i++) {

            const day = this.days.nth(i);

            // Check if this day has available slots
            const text = await day.textContent();

            if (text.includes('slots available')) {

                // Click that day
                await day.click();

                // Wait for slots to load
                await this.page.waitForTimeout(1000);

                // Get all available time slots for that day
                const slotCount = await this.slots.count();

                if (slotCount > 0) {

                    // Select first available slot
                    const firstSlot = this.slots.first();

                    await firstSlot.scrollIntoViewIfNeeded();
                    await firstSlot.click();

                    console.log('Selected first available slot');
                    return;
                }
            }
        }
    }
}



module.exports = findDoctor;
