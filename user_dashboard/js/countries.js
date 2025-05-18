/**
 * Country Select Component - Updated Version
 * 
 * Features:
 * - Dynamically populates countries from API or static list
 * - Includes proper data formatting
 * - Supports search functionality
 * - Graceful fallback to static countries list
 */

class CountrySelect {
    constructor(options = {}) {
        // Configuration
        this.config = {
            selector: options.selector || '.country-select',
            placeholder: options.placeholder || 'Select country',
            defaultCountry: options.defaultCountry || '',
            apiUrl: options.apiUrl || null,
            staticCountries: options.staticCountries || null,
            formatData: options.formatData || ((data) => data),
            scrollHeight: options.scrollHeight || '900px',
            onSelect: options.onSelect || null
        };

        // Initialize
        this.init();
    }

    async init() {
        // Find select element
        this.selectElement = document.querySelector(this.config.selector);
        if (!this.selectElement) {
            console.error(`CountrySelect: Element with selector '${this.config.selector}' not found`);
            return;
        }

        // Add loading state
        this.selectElement.innerHTML = `<option value="">Loading countries...</option>`;
        this.selectElement.disabled = true;

        try {
            // Get countries data
            let countries;

            if (this.config.apiUrl) {
                try {
                    countries = await this.fetchCountries();
                } catch (err) {
                    console.warn("Failed to fetch countries from API, using static list", err);
                    countries = this.config.staticCountries || [];
                }
            } else {
                countries = this.config.staticCountries || [];
            }

            // Ensure we have countries
            if (!countries || countries.length === 0) {
                throw new Error("No countries data available");
            }

            // Populate select
            this.populateSelect(countries);

            // Enable search if many countries
            if (countries.length > 10) {
                this.enableSearch();
            }

            // Set default country if specified
            if (this.config.defaultCountry) {
                this.setCountry(this.config.defaultCountry);
            }

        } catch (error) {
            console.error('CountrySelect: Failed to initialize', error);
            this.selectElement.innerHTML = `<option value="">Failed to load countries</option>`;
        } finally {
            this.selectElement.disabled = false;

            // Add event listener for change events
            this.selectElement.addEventListener('change', (e) => {
                if (this.config.onSelect && typeof this.config.onSelect === 'function') {
                    this.config.onSelect(e.target.value);
                }
            });
        }
    }

    async fetchCountries() {
        const response = await fetch(this.config.apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        // Use the formatData function if provided
        if (typeof this.config.formatData === 'function') {
            return this.config.formatData(data);
        }

        return data;
    }

    populateSelect(countries) {
        // Clear existing options
        this.selectElement.innerHTML = '';

        // Add placeholder
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = this.config.placeholder;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        this.selectElement.appendChild(placeholderOption);

        // Add countries in alphabetical order
        countries
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(country => {
                const option = document.createElement('option');
                option.value = country.code || country.name;
                option.textContent = country.name;
                this.selectElement.appendChild(option);
            });
    }

    // enableSearch() {
    //     // Create search input
    //     const searchContainer = document.createElement('div');
    //     searchContainer.className = 'country-search-container';
    //     searchContainer.style.position = 'relative';
    //     searchContainer.style.marginBottom = '10px';

    //     const input = document.createElement('input');
    //     input.type = 'text';
    //     input.className = 'form-control country-search';
    //     input.placeholder = 'Search countries...';
    //     input.style.width = '100%';

    //     searchContainer.appendChild(input);

    //     // Insert before select element
    //     this.selectElement.parentNode.insertBefore(searchContainer, this.selectElement);

    //     // Filter options based on search
    //     input.addEventListener('input', (e) => {
    //         const searchTerm = e.target.value.toLowerCase();
    //         const options = Array.from(this.selectElement.querySelectorAll('option'));

    //         options.forEach(option => {
    //             if (option.value === '') return; // Skip placeholder

    //             const match = option.textContent.toLowerCase().includes(searchTerm);
    //             option.style.display = match ? '' : 'none';
    //         });
    //     });
    // }

    enableSearch() {
        // Only add search if not already added
        if (this.selectElement.previousElementSibling?.classList?.contains('country-search-container')) return;

        const searchContainer = document.createElement('div');
        searchContainer.className = 'country-search-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control country-search';
        input.placeholder = 'Search countries...';

        searchContainer.appendChild(input);
        this.selectElement.parentNode.insertBefore(searchContainer, this.selectElement);

        // Store original options
        const originalOptions = Array.from(this.selectElement.options);

        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            // Reset all options first
            originalOptions.forEach(option => {
                option.style.display = '';
            });

            // Filter if search term exists
            if (searchTerm) {
                originalOptions.forEach(option => {
                    if (option.value && !option.textContent.toLowerCase().includes(searchTerm)) {
                        option.style.display = 'none';
                    }
                });
            }
        });
    }

    setCountry(countryCodeOrName) {
        const options = Array.from(this.selectElement.querySelectorAll('option'));

        const option = options.find(opt =>
            opt.value === countryCodeOrName ||
            opt.textContent === countryCodeOrName
        );

        if (option) {
            option.selected = true;

            // Trigger change event
            const event = new Event('change');
            this.selectElement.dispatchEvent(event);
        }
    }

    getSelectedCountry() {
        return {
            code: this.selectElement.value,
            name: this.selectElement.options[this.selectElement.selectedIndex].textContent
        };
    }
}