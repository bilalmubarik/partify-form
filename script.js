const productsData = [
  {
    "Year": 2011,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2012,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2013,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2014,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2015,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2011,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Rear Bumper"
  },
  {
    "Year": 2012,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Rear Bumper"
  },
  {
    "Year": 2013,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Rear Bumper"
  },
  {
    "Year": 2014,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Rear Bumper"
  },
  {
    "Year": 2015,
    "Make": "RAM",
    "Model": 1500,
    "Product Type": "Rear Bumper"
  },
  {
    "Year": 2012,
    "Make": "RAM",
    "Model": 2500,
    "Product Type": "Tailgate"
  },
  {
    "Year": 2013,
    "Make": "RAM",
    "Model": 2500,
    "Product Type": "Tailgate"
  },
  {
    "Year": 2014,
    "Make": "RAM",
    "Model": 2500,
    "Product Type": "Tailgate"
  },
  {
    "Year": 2015,
    "Make": "RAM",
    "Model": 2500,
    "Product Type": "Tailgate"
  },
  {
    "Year": 2016,
    "Make": "RAM",
    "Model": 2500,
    "Product Type": "Tailgate"
  },
  {
    "Year": 2013,
    "Make": "Toyota",
    "Model": "Camry",
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2014,
    "Make": "Toyota",
    "Model": "Camry",
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2015,
    "Make": "Toyota",
    "Model": "Camry",
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2016,
    "Make": "Toyota",
    "Model": "Camry",
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2017,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Front Bumper"
  },
  {
    "Year": 2013,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Passenger Side Fender"
  },
  {
    "Year": 2014,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Passenger Side Fender"
  },
  {
    "Year": 2015,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Passenger Side Fender"
  },
  {
    "Year": 2016,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Passenger Side Fender"
  },
  {
    "Year": 2017,
    "Make": "Toyota",
    "Model": "Corolla",
    "Product Type": "Passenger Side Fender"
  }
];

const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const productTypeSelect = document.getElementById('productType');
const resultSection = document.getElementById('resultSection');
const selectedInfo = document.getElementById('selectedInfo');
const viewProductBtn = document.getElementById('viewProductBtn');

let currentProductURL = '';

function init() {
    populateYears();
    setupEventListeners();
}

function generateProductURL(year, make, model, productType) {
    const baseURL = 'https://partifyusa.com/collections/';
    const collectionPath = `${year}-${make}-${model}`;
    const queryParam = `?filter.p.product_type=${encodeURIComponent(productType)}`;
    return baseURL + collectionPath + queryParam;
}

function populateYears() {
    const years = [...new Set(productsData.map(item => item.Year))].sort((a, b) => a - b);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

function setupEventListeners() {
    yearSelect.addEventListener('change', handleYearChange);
    makeSelect.addEventListener('change', handleMakeChange);
    modelSelect.addEventListener('change', handleModelChange);
    productTypeSelect.addEventListener('change', handleProductTypeChange);
    viewProductBtn.addEventListener('click', navigateToProduct);
}

function handleYearChange() {
    const selectedYear = parseInt(yearSelect.value);
    
    resetDropdown(makeSelect);
    resetDropdown(modelSelect);
    resetDropdown(productTypeSelect);
    resultSection.style.display = 'none';
    
    if (selectedYear) {
        const makes = [...new Set(
            productsData
                .filter(item => item.Year === selectedYear)
                .map(item => item.Make)
        )].sort();
        
        populateDropdown(makeSelect, makes);
        makeSelect.disabled = false;
    } else {
        makeSelect.disabled = true;
    }
}

function handleMakeChange() {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMake = makeSelect.value;
    
    resetDropdown(modelSelect);
    resetDropdown(productTypeSelect);
    resultSection.style.display = 'none';
    
    if (selectedMake) {
        const models = [...new Set(
            productsData
                .filter(item => item.Year === selectedYear && item.Make === selectedMake)
                .map(item => item.Model)
        )].sort((a, b) => {
            if (typeof a === 'number' && typeof b === 'number') {
                return a - b;
            }
            return String(a).localeCompare(String(b));
        });
        
        populateDropdown(modelSelect, models);
        modelSelect.disabled = false;
    } else {
        modelSelect.disabled = true;
    }
}

function handleModelChange() {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;
    
    resetDropdown(productTypeSelect);
    resultSection.style.display = 'none';
    
    if (selectedModel) {
        const productTypes = [...new Set(
            productsData
                .filter(item => 
                    item.Year === selectedYear && 
                    item.Make === selectedMake && 
                    String(item.Model) === selectedModel
                )
                .map(item => item['Product Type'])
        )].sort();
        
        populateDropdown(productTypeSelect, productTypes);
        productTypeSelect.disabled = false;
    } else {
        productTypeSelect.disabled = true;
    }
}

function handleProductTypeChange() {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;
    const selectedProductType = productTypeSelect.value;
    
    if (selectedProductType) {
        const product = productsData.find(item => 
            item.Year === selectedYear && 
            item.Make === selectedMake && 
            String(item.Model) === selectedModel &&
            item['Product Type'] === selectedProductType
        );
        
        if (product) {
            currentProductURL = generateProductURL(selectedYear, selectedMake, selectedModel, selectedProductType);
            selectedInfo.textContent = `${selectedYear} ${selectedMake} ${selectedModel} - ${selectedProductType}`;
            resultSection.style.display = 'block';
        }
    } else {
        resultSection.style.display = 'none';
    }
}

function populateDropdown(selectElement, values) {
    selectElement.innerHTML = `<option value="">${selectElement.options[0].text}</option>`;
    
    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);
    });
}

function resetDropdown(selectElement) {
    selectElement.innerHTML = `<option value="">${selectElement.options[0].text}</option>`;
    selectElement.disabled = true;
    selectElement.value = '';
}

function navigateToProduct() {
    if (currentProductURL) {
        window.open(currentProductURL, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', init);

