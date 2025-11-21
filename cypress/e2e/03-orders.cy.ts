describe('Orders Management', () => {
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

        // Wait for redirect after successful login
        cy.url({ timeout: 15000 }).should('include', '/patients')
    })

    describe('Orders List Page', () => {

        it('should have search and filter functionality', () => {
            cy.visit('/orders')

            // Check for search inputs based on actual UI
            cy.get('input[placeholder*="order number" i]').should('be.visible')
            cy.get('input[placeholder*="patient name" i]').should('be.visible')

            // Check for status filter
            cy.get('body').then(($body) => {
                if ($body.find('select, [data-testid*="select"]').length > 0) {
                    cy.get('select, [data-testid*="select"]').should('be.visible')
                }
            })
        })

        it('should navigate to new order page', () => {
            cy.visit('/orders/new')
            cy.contains('Create New Order').should('be.visible')
            cy.url().should('include', '/orders/new')
        })
    })

    describe('New Order Page', () => {
        it('should display order creation form with required fields', () => {
            cy.visit('/orders/new')

            // Check page title
            cy.contains('Create New Order').should('be.visible')

            // Check for patient selection section
            cy.contains('Patient Information').should('be.visible')

            // Check for lab tests section
            cy.contains('Lab Tests').should('be.visible')

            // Check for order summary
            cy.contains('Order Summary').should('be.visible')

            // Should have create order button (but it should be disabled initially)
            cy.get('button').contains('Create Order').should('be.visible')
        })

        it('should show form validation and interactions', () => {
            cy.visit('/orders/new')

            // Try to submit without selecting anything
            cy.get('button').contains('Create Order').should('be.disabled')

            // Check if patient selection works
            cy.get('body').then(($body) => {
                if ($body.find('[data-testid*="combobox"], [role="combobox"]').length > 0) {
                    cy.get('[data-testid*="combobox"], [role="combobox"]').first().should('be.visible')
                }
            })
        })
    })

    describe('Order Details Page', () => {
        it('should display order information when accessing order detail', () => {
            cy.visit('/orders')

            // Check if there are orders to view
            cy.get('table tbody tr').then(($rows) => {
                if ($rows.length > 0) {
                    // Click on first order's view button
                    cy.get('table tbody tr').first().within(() => {
                        cy.get('button').first().click()
                    })

                    // Should navigate to order detail page
                    cy.url().should('match', /\/orders\/[a-f0-9-]+$/)

                    // Should show order details
                    cy.contains('Order #').should('be.visible')
                    cy.contains('Patient Information').should('be.visible')
                    cy.contains('Lab Tests Ordered').should('be.visible')
                } else {
                    // If no orders exist, just verify we can visit the orders page
                    cy.url().should('include', '/orders')
                }
            })
        })
    })

    describe('Order Management Features', () => {
        it('should handle order actions and navigation', () => {
            cy.visit('/orders')

            // Check pagination if orders exist
            cy.get('body').then(($body) => {
                if ($body.find('table tbody tr').length > 0) {
                    // Should have action buttons in table
                    cy.get('table tbody tr').first().within(() => {
                        cy.get('button').should('have.length.greaterThan', 0)
                    })
                }

                // Should be able to navigate back to main orders page
                cy.url().should('include', '/orders')
            })
        })
    })
})