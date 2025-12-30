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

// 新增訂單
function addOrder() {
    const name = document.getElementById('userName').value.trim();
    const food = document.getElementById('foodSelect').value;

    if (!name || !food) {
        alert("請輸入姓名並選擇餐點！");
        return;
    }

    orders.push({ name, food });
    updateTable();
    document.getElementById('userName').value = '';
}

// 更新統計表格
function updateTable() {
    const tbody = document.getElementById('resultBody');
    tbody.innerHTML = '';

    menu.forEach(foodItem => {
        // 篩選出訂購該餐點的所有人
        const people = orders.filter(o => o.food === foodItem).map(o => o.name);
        
        const row = `<tr>
            <td>${foodItem}</td>
            <td><strong>${people.length}</strong> 人</td>
            <td>${people.join(', ') || '(尚無人訂購)'}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}