let menu = [];
let orders = [];

// 新增餐點到選單
function addFoodItem() {
    const foodInput = document.getElementById('foodInput');
    const foodName = foodInput.value.trim();

    if (foodName && !menu.includes(foodName)) {
        menu.push(foodName);
        updateDropdown();
        updateTable();
        foodInput.value = '';
    }
}

// 更新下拉選單
function updateDropdown() {
    const select = document.getElementById('foodSelect');
    select.innerHTML = '<option value="">-- 請選擇餐點 --</option>';
    menu.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        select.appendChild(opt);
    });
}

// 新增訂單 (修改處：加入 paid 屬性)
function addOrder() {
    const name = document.getElementById('userName').value.trim();
    const food = document.getElementById('foodSelect').value;

    if (!name || !food) {
        alert("請輸入姓名並選擇餐點！");
        return;
    }

    // 預設 paid 為 false
    orders.push({ name, food, paid: false });
    updateTable();
    document.getElementById('userName').value = '';
}

// 切換繳費狀態的新函式
function togglePaid(index) {
    orders[index].paid = !orders[index].paid;
    updateTable();
}

// 更新統計表格 (修改處：顯示繳費狀態)
function updateTable() {
    const tbody = document.getElementById('resultBody');
    tbody.innerHTML = '';

    menu.forEach(foodItem => {
        // 找出所有訂這個餐點的訂單索引與資料
        const itemOrders = orders.map((o, index) => ({ ...o, index })).filter(o => o.food === foodItem);

        // 建立名單 HTML，加入點擊切換功能
        const namesHtml = itemOrders.map(o => {
            const statusClass = o.paid ? 'status-paid' : 'status-unpaid';
            const statusText = o.paid ? '✅已繳' : '❌未繳';
            return `<span class="name-tag ${statusClass}" onclick="togglePaid(${o.index})">${o.name} (${statusText})</span>`;
        }).join(' ');

        const row = `<tr>
            <td>${foodItem}</td>
            <td><strong>${itemOrders.length}</strong> 人</td>
            <td>${namesHtml || '(尚無人訂購)'}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}