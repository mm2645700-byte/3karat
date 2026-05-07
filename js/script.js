const CITIES = ["القاهرة", "الإسكندرية", "الجيزة", "الساحل الشمالي", "الجونة", "أسوان"];
const TYPES = ["فيلا مودرن", "شقة فاخرة", "بنتهاوس", "دوبلكس لقطة"];
const BADGES = ["مميز", "جديد", "حصري", "لقطة"];
const REAL_IMAGES = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09"
];

let properties = [];

const initData = () => {
    for (let i = 1; i <= 50; i++) {
        const imgBase = REAL_IMAGES[i % REAL_IMAGES.length];
        properties.push({
            id: i,
            title: `${TYPES[i % TYPES.length]} رقم ${i}`,
            location: CITIES[i % CITIES.length],
            price: (Math.floor(Math.random() * 50) + 10) * 100000 + " ج.م",
            beds: Math.floor(Math.random() * 5) + 1,
            baths: Math.floor(Math.random() * 3) + 1,
            area: (Math.floor(Math.random() * 200) + 80) + "م²",
            badge: BADGES[i % BADGES.length],
            imgUrl: `${imgBase}?auto=format&fit=crop&w=600&q=80&sig=${i}`
        });
    }
};

const displayProperties = (data) => {
    const grid = document.getElementById('propertyGrid');
    document.getElementById('count').innerText = data.length;
    
    grid.innerHTML = data.map(p => `
        <div class="card" onclick="openModal(${p.id})">
            <div class="card-badge">${p.badge}</div>
            <div class="img-container">
                <img src="${p.imgUrl}" alt="${p.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-price">${p.price}</div>
                <h3>${p.title}</h3>
                <p style="color:#666; font-size:0.9rem;">
                    <i class="fas fa-map-marker-alt"></i> ${p.location}
                </p>
                <div class="features">
                    <span><i class="fas fa-bed"></i> ${p.beds} غرف</span>
                    <span><i class="fas fa-bath"></i> ${p.baths} حمام</span>
                    <span><i class="fas fa-expand"></i> ${p.area}</span>
                </div>
            </div>
        </div>
    `).join('');
};

const openModal = (id) => {
    const p = properties.find(x => x.id === id);
    if (!p) return;

    document.getElementById('modalTitle').innerText = p.title;
    document.getElementById('modalLocation').innerText = p.location;
    document.getElementById('modalPrice').innerText = p.price;
    document.getElementById('modalBeds').innerText = p.beds;
    document.getElementById('modalBaths').innerText = p.baths;
    document.getElementById('modalArea').innerText = p.area;
    document.getElementById('modalImg').src = p.imgUrl;
    
    document.getElementById('propertyModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    document.getElementById('propertyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

const filterProperties = () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = properties.filter(p => 
        p.location.toLowerCase().includes(query) || 
        p.title.toLowerCase().includes(query)
    );
    displayProperties(filtered);
};

document.getElementById('searchInput').addEventListener('keyup', filterProperties);
document.getElementById('closeModal').addEventListener('click', closeModal);

window.onclick = (e) => {
    if (e.target.id === 'propertyModal') closeModal();
};

initData();
displayProperties(properties);