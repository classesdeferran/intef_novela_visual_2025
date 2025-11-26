document.addEventListener('DOMContentLoaded', () => {
	const btn = document.getElementById('videoResumen');
	const modal = document.getElementById('videoModal');
	const closeBtn = document.getElementById('videoClose');
	const video = document.getElementById('modalVideo');

	if (!btn || !modal || !closeBtn || !video) return;

	function openModal() {
		modal.removeAttribute('hidden');
		// Intentar reproducir; si falla por autoplay policy, silenciamos y reintentamos
		video.play().catch(() => {
			video.muted = true;
			video.play().catch(() => {});
		});
	}

	function closeModal() {
		video.pause();
		video.currentTime = 0;
		video.muted = false;
		modal.setAttribute('hidden', '');
	}

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		openModal();
	});

	closeBtn.addEventListener('click', () => {
		closeModal();
	});

	// Cerrar modal con ESC o clic en backdrop
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
	});
});
