const container = document.getElementById('visualization-container');
const originalSVG = document.querySelector('svg');
console.log(originalSVG);

const circle = document.getElementById('circle');
circle.style.transition = 'transform 0.25s, opacity 0.25s';
circle.addEventListener('mouseenter', () => {
    circle.style.transform = 'translateY(-6px)';
});
circle.addEventListener('mouseleave', () => {
    circle.style.transform = '';
});

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

circle.addEventListener('click', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    circle.setAttribute('fill', randomColor);
});

const val = document.createElementNS('http://www.w3.org/2000/svg', 'text');
const cx = circle.cx.baseVal.value;
const cy = circle.cy.baseVal.value;

val.setAttribute('x', cx-30);
val.setAttribute('y', cy+100);
val.setAttribute('fill', '#000');
val.textContent = 'Click this!';
originalSVG.appendChild(val);

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
container.appendChild(svg);

const data = [50, 80, 120, 60, 150, 90, 200];

data.forEach((value, index) => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', index * 60 + 30);
    rect.setAttribute('y', 300 - value);
    rect.setAttribute('width', '50');
    rect.setAttribute('height', value);
    rect.setAttribute('fill', colors[index % colors.length]);

    rect.style.transition = 'transform 0.25s, opacity 0.25s';
    rect.addEventListener('mouseenter', () => {
        rect.style.transform = 'translateY(-6px)';
    });
    rect.addEventListener('mouseleave', () => {
        rect.style.transform = '';
    });

    svg.appendChild(rect);

    const val = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    val.setAttribute('x', index * 60 + 55);
    val.setAttribute('y', 300 - value - 10);
    val.setAttribute('fill', '#000');
    val.setAttribute('font-size', '12');
    val.setAttribute('text-anchor', 'middle');
    val.textContent = value;

    svg.appendChild(val);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', index * 60 + 55);
    label.setAttribute('y', 320);
    label.setAttribute('fill', '#000');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = `Item ${index + 1}`;

    svg.appendChild(label);
})
