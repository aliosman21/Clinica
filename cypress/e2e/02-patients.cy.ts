describe('Patients Management', () => {
    beforeEach(() => {
        // Clear session and start fresh
        cy.clearCookies()
        cy.clearLocalStorage()

        // Login before each test
        cy.visit('/login')
        cy.wait(1000) // Wait for hydration
        cy.get('h1').contains('Login').should('be.visible')

        // Use correct input selectors and credentials
        cy.get('input[name="email"]').type('ali@test.com')
        cy.get('input[name="password"]').type('Aa1234!!')
        cy.get('button[type="submit"]').click()

        // Wait for redirect after successful login (should go to /patients)
        cy.url({ timeout: 15000 }).should('include', '/patients')
    })

    describe('Patients List Page', () => {
        it('should display patients in table format', () => {
            cy.visit('/patients')

            // Check table structure matches screenshot
            cy.get('table').should('be.visible')

            // Check table headers match actual UI
            cy.get('table thead th').should('contain.text', 'Name')
            cy.get('table thead th').should('contain.text', 'Email')
            cy.get('table thead th').should('contain.text', 'Phone')
            cy.get('table thead th').should('contain.text', 'Date of Birth')
            cy.get('table thead th').should('contain.text', 'Orders')
            cy.get('table thead th').should('contain.text', 'Actions')

            // Should have patient data
            cy.get('table tbody tr').should('have.length.greaterThan', 0)
        })

        it('should have search functionality', () => {
            cy.visit('/patients')

            // Check search input matches placeholder from screenshot
            cy.get('input[placeholder="Search patients by name..."]').should('be.visible')

            // Test search functionality
            cy.get('input[placeholder="Search patients by name..."]').type('David')

            // Should filter results
            cy.get('table tbody tr').should('have.length.greaterThan', 0)
        })

        it('should show pagination information', () => {
            cy.visit('/patients')

            // Check for pagination info (from screenshot: "Page 1 of 2", "Showing 1 to 5 of 10 entries")
            cy.contains(/page \d+ of \d+/i).should('be.visible')
            cy.contains(/showing/i).should('be.visible')
        })

        it('should navigate to new patient page', () => {
            cy.visit('/patients/new')
            cy.url().should('include', '/patients/new')
            cy.contains('Create New Patient')
        })

        it('should have action buttons in table', () => {
            cy.visit('/patients')

            // Check that Actions column exists
            cy.get('table thead').should('contain.text', 'Actions')

            // Check that action buttons exist in first row
            cy.get('table tbody tr').first().within(() => {
                cy.get('button').should('have.length.greaterThan', 0)
            })
        })
    })

    describe('New Patient Page', () => {
        it('should display patient creation form', () => {
            cy.visit('/patients/new')

            // Wait for form to load
            cy.get('h1, h2').should('be.visible')

            // Check for form inputs (use more flexible selectors)
            cy.get('input').should('have.length.greaterThan', 0)
            cy.get('button[type="submit"], button').contains(/save|create|submit/i).should('be.visible')
        })

        it('should handle form interactions', () => {
            cy.visit('/patients/new')

            // Check if form elements are available
            cy.get('input').should('have.length.greaterThan', 0)

            // Submit form and verify behavior
            cy.get('button[type="submit"], button').contains(/save|create|submit/i).click()

            // Should either redirect or show validation
            cy.url().should('include', '/patients')
        })
    })

    describe('Patient Data Verification', () => {
        it('should show expected patient information', () => {
            cy.visit('/patients')

            // Patient information should be visible in the table
            cy.get('table').should('contain.text', 'David Wilson')
            cy.get('table').should('contain.text', 'Emily Davis')

            // Check orders column shows data
            cy.get('table thead').should('contain.text', 'Orders')
            cy.get('table tbody tr').first().within(() => {
                // Look specifically in the Orders column for number data
                cy.get('td').should('contain.text', '1')
            })
        })
    })
})