import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse for interactivity
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initialize nodes
    const nodeCount = Math.min(Math.floor((width * height) / 12000), 70);
    if (nodesRef.current.length === 0 || nodesRef.current.length !== nodeCount) {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2.5 + 0.8,
          pulse: Math.random() * Math.PI * 2,
          hue: Math.random() > 0.6 ? 'purple' : Math.random() > 0.5 ? 'cyan' : 'indigo',
        });
      }
    }

    const nodes = nodesRef.current;
    const connectionDistance = 160;
    const mouseRadius = 180;

    const getColors = () => {
      const isDark = theme === 'dark';
      return {
        indigo: isDark ? 'rgba(129, 140, 248, 0.75)' : 'rgba(99, 102, 241, 0.5)',
        purple: isDark ? 'rgba(192, 132, 252, 0.75)' : 'rgba(147, 51, 234, 0.5)',
        cyan: isDark ? 'rgba(34, 211, 238, 0.65)' : 'rgba(8, 145, 178, 0.45)',
        line: isDark ? 'rgba(129, 140, 248, 0.08)' : 'rgba(99, 102, 241, 0.05)',
        lineActive: isDark ? 'rgba(129, 140, 248, 0.25)' : 'rgba(99, 102, 241, 0.15)',
        glow: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.12)',
      };
    };

    const animate = () => {
      const colors = getColors();
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Update positions
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          // Mouse repulsion
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouseRadius && mDist > 0) {
            const force = (mouseRadius - mDist) / mouseRadius * 0.015;
            node.vx += (mdx / mDist) * force;
            node.vy += (mdy / mDist) * force;
          }

          // Damping
          node.vx *= 0.998;
          node.vy *= 0.998;

          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.018;
        }

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance);

            // Check if near mouse
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
            const nearMouse = mouseDist < mouseRadius;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nearMouse ? colors.lineActive : colors.line;
            ctx.globalAlpha = alpha * (nearMouse ? 1.5 : 1);
            ctx.lineWidth = nearMouse ? 1 : 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulseScale = prefersReducedMotion ? 1 : 1 + Math.sin(node.pulse) * 0.35;
        const r = node.radius * pulseScale;

        // Mouse proximity glow
        const mdist = Math.sqrt((node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2);
        const nearMouse = mdist < mouseRadius;

        // Glow
        if (nearMouse || node.radius > 2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * (nearMouse ? 5 : 3.5), 0, Math.PI * 2);
          ctx.fillStyle = colors.glow;
          ctx.globalAlpha = nearMouse ? 0.3 : 0.12;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * (nearMouse ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = colors[node.hue];
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion) {
      animate();
    } else {
      animate();
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
