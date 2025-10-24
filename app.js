
    // Variables globales
    let exchangeRates = {};
    const unitConversions = {
      length: {
        m: { name: 'Metros', factor: 1 },
        km: { name: 'Kilómetros', factor: 0.001 },
        cm: { name: 'Centímetros', factor: 100 },
        mm: { name: 'Milímetros', factor: 1000 },
        ft: { name: 'Pies', factor: 3.28084 },
        in: { name: 'Pulgadas', factor: 39.3701 }
      },
      weight: {
        kg: { name: 'Kilogramos', factor: 1 },
        g: { name: 'Gramos', factor: 1000 },
        lb: { name: 'Libras', factor: 2.20462 },
        oz: { name: 'Onzas', factor: 35.274 }
      },
      temperature: {
        c: { name: 'Celsius (°C)', convert: (v, to) => to === 'f' ? (v * 9/5) + 32 : to === 'k' ? v + 273.15 : v },
        f: { name: 'Fahrenheit (°F)', convert: (v, to) => to === 'c' ? (v - 32) * 5/9 : to === 'k' ? (v - 32) * 5/9 + 273.15 : v },
        k: { name: 'Kelvin (K)', convert: (v, to) => to === 'c' ? v - 273.15 : to === 'f' ? (v - 273.15) * 9/5 + 32 : v }
      },
      volume: {
        l: { name: 'Litros', factor: 1 },
        ml: { name: 'Mililitros', factor: 1000 },
        gal: { name: 'Galones', factor: 0.264172 },
        floz: { name: 'Onzas líquidas', factor: 33.814 }
      }
    };

    // Elementos DOM
    const themeToggle = document.getElementById('themeToggle');
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const resultDiv = document.getElementById('resultCurrency');
    const rateDiv = document.getElementById('rateCurrency');
    const resultAmountInput = document.getElementById('resultAmount');
    const swapBtnCurrency = document.getElementById('swapCurrency');
    const errorAlert = document.getElementById('errorAlert');
    const loadingCurrency = document.getElementById('loadingCurrency');
    
    const unitTypeSelect = document.getElementById('unitType');
    const unitAmountInput = document.getElementById('unitAmount');
    const unitFromSelect = document.getElementById('unitFrom');
    const unitToSelect = document.getElementById('unitTo');
    const unitResultAmountInput = document.getElementById('unitResultAmount');
    const resultUnitDiv = document.getElementById('resultUnit');
    const swapBtnUnit = document.getElementById('swapUnit');
    
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');

    // Tema oscuro
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    }

    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector('i');
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });

    // Funciones de error
    function showError(message) {
      errorAlert.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <i class="fas fa-exclamation-triangle"></i> ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `;
    }

    // Cargar tasas de cambio
    async function loadExchangeRates() {
      try {
        loadingCurrency.style.display = 'flex';
        errorAlert.innerHTML = '';
        const response = await fetch('https://api.exchangerate.host/latest?base=USD');
        const data = await response.json();
        
        if (data.success && data.rates) {
          exchangeRates = data.rates;
          exchangeRates.USD = 1;
          convertCurrency();
        } else {
          throw new Error('Respuesta inválida de la API');
        }
      } catch (error) {
        showError('Error al cargar tasas. Usando valores estimados.');
        exchangeRates = {
          USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50,
          MXN: 17.20, CAD: 1.36, AUD: 1.53, CHF: 0.88,
          CNY: 7.24, INR: 83.12, BRL: 4.98, ARS: 350.00
        };
        convertCurrency();
      } finally {
        loadingCurrency.style.display = 'none';
      }
    }

    // Convertir moneda
    function convertCurrency() {
      const amount = parseFloat(amountInput.value) || 0;
      const from = fromSelect.value;
      const to = toSelect.value;

      if (!exchangeRates[from] || !exchangeRates[to]) return;

      const amountInUSD = amount / exchangeRates[from];
      const convertedAmount = amountInUSD * exchangeRates[to];
      const rate = exchangeRates[to] / exchangeRates[from];

      resultAmountInput.value = convertedAmount.toFixed(2);
      resultDiv.textContent = `${convertedAmount.toFixed(2)} ${to}`;
      rateDiv.innerHTML = `<span class="badge bg-light text-dark">1 ${from} = ${rate.toFixed(4)} ${to}</span>`;

      // Guardar en historial
      saveToHistory('currency', `${amount} ${from} → ${convertedAmount.toFixed(2)} ${to}`);
    }

    function swapCurrencies() {
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
      convertCurrency();
    }

    // Conversor de unidades
    function populateUnitSelects() {
      const type = unitTypeSelect.value;
      const units = unitConversions[type];
      
      unitFromSelect.innerHTML = '';
      unitToSelect.innerHTML = '';
      
      Object.keys(units).forEach((key, index) => {
        const option1 = new Option(units[key].name, key, index === 0, index === 0);
        const option2 = new Option(units[key].name, key, index === 1, index === 1);
        unitFromSelect.add(option1);
        unitToSelect.add(option2);
      });
      
      convertUnit();
    }

    function convertUnit() {
      const amount = parseFloat(unitAmountInput.value) || 0;
      const type = unitTypeSelect.value;
      const from = unitFromSelect.value;
      const to = unitToSelect.value;
      const units = unitConversions[type];

      let result;
      
      if (type === 'temperature') {
        result = units[from].convert(amount, to);
      } else {
        result = (amount / units[from].factor) * units[to].factor;
      }

      unitResultAmountInput.value = result.toFixed(2);
      resultUnitDiv.textContent = `${result.toFixed(2)} ${units[to].name}`;

      saveToHistory('unit', `${amount} ${units[from].name} → ${result.toFixed(2)} ${units[to].name}`);
    }

    function swapUnits() {
      const temp = unitFromSelect.value;
      unitFromSelect.value = unitToSelect.value;
      unitToSelect.value = temp;
      convertUnit();
    }

    // Historial
    function saveToHistory(type, conversion) {
      const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      const entry = {
        type,
        conversion,
        timestamp: new Date().toLocaleString('es-MX')
      };
      
      history.unshift(entry);
      
      if (history.length > 20) history.pop();
      
      localStorage.setItem('conversionHistory', JSON.stringify(history));
    }

    function loadHistory() {
      const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      
      if (history.length === 0) {
        historyList.innerHTML = `
          <div class="empty-history">
            <i class="fas fa-inbox"></i>
            <p>No hay conversiones recientes</p>
          </div>
        `;
        return;
      }
      
      historyList.innerHTML = history.map((item, index) => `
        <div class="history-item">
          <div>
            <strong>${item.type === 'currency' ? '💱' : '📏'} ${item.conversion}</strong>
            <br>
            <small class="text-muted">${item.timestamp}</small>
          </div>
          <button class="delete-btn" onclick="deleteHistoryItem(${index})">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('');
    }

    function deleteHistoryItem(index) {
      const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      history.splice(index, 1);
      localStorage.setItem('conversionHistory', JSON.stringify(history));
      loadHistory();
    }

    function clearHistory() {
      if (confirm('¿Estás seguro de eliminar todo el historial?')) {
        localStorage.removeItem('conversionHistory');
        loadHistory();
      }
    }

    // Event listeners
    amountInput.addEventListener('input', convertCurrency);
    fromSelect.addEventListener('change', convertCurrency);
    toSelect.addEventListener('change', convertCurrency);
    swapBtnCurrency.addEventListener('click', swapCurrencies);

    unitTypeSelect.addEventListener('change', populateUnitSelects);
    unitAmountInput.addEventListener('input', convertUnit);
    unitFromSelect.addEventListener('change', convertUnit);
    unitToSelect.addEventListener('change', convertUnit);
    swapBtnUnit.addEventListener('click', swapUnits);

    clearHistoryBtn.addEventListener('click', clearHistory);

    // Actualizar historial cuando se cambia de tab
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', (e) => {
        if (e.target.getAttribute('href') === '#history') {
          loadHistory();
        }
      });
    });

    // Hacer función global para eliminar items
    window.deleteHistoryItem = deleteHistoryItem;

    // Inicialización
    initTheme();
    loadExchangeRates();
    populateUnitSelects();
    loadHistory();
