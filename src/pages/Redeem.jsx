import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

function Redeem() {
  const [searchParams] = useSearchParams();
  const voucherId = searchParams.get('voucher');
  const [voucher, setVoucher] = useState(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (voucherId) {
      try {
        // Decodificar los datos del voucher de la URL
        const decodedData = JSON.parse(decodeURIComponent(voucherId));
        
        // Verificar si el voucher ya ha sido canjeado
        const checkVoucherStatus = async () => {
          try {
            // Aquí iría la llamada a la API para verificar el estado
            // Por ahora usamos un mock
            const mockVoucher = {
              code: decodedData.id,
              value: decodedData.value,
              date: decodedData.date,
              type: decodedData.type,
              status: decodedData.status,
              locationName: 'Reverse x Nike Store'
            };
            setVoucher(mockVoucher);
          } catch (error) {
            console.error('Error al verificar el voucher:', error);
            alert('Error al verificar el voucher. Por favor, inténtalo de nuevo.');
          }
        };
        
        checkVoucherStatus();
      } catch (error) {
        console.error('Error al decodificar el voucher:', error);
        alert('Voucher inválido');
      }
    }
    setIsLoading(false);
  }, [voucherId]);

  const handleRedeem = async () => {
    if (!voucher) return;
    
    try {
      // Aquí iría la llamada a la API para canjear el voucher
      // Por ahora simulamos el éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el estado del voucher
      setVoucher(prev => ({
        ...prev,
        status: 'redeemed'
      }));
      
      setIsRedeemed(true);
      alert('¡Voucher canjeado con éxito!');
    } catch (error) {
      console.error('Error al canjear el voucher:', error);
      alert('Error al canjear el voucher. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDownloadVoucher = () => {
    const voucherEl = document.getElementById('voucher-card');
    if (voucherEl) {
      html2canvas(voucherEl).then(canvas => {
        const link = document.createElement('a');
        link.download = `reverse-voucher-${voucher.code}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7f7f7' }}>
        <div style={{ fontSize: 18, color: '#232323' }}>Cargando voucher...</div>
      </div>
    );
  }

  if (!voucher) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7f7f7' }}>
        <div style={{ fontSize: 18, color: '#232323' }}>Voucher no encontrado.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: '#f7f7f7', padding: '2rem 1rem' }}>
      <div id="voucher-card" style={{ background: '#fff', color: '#232323', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', textAlign: 'center', position: 'relative', margin: '0 auto' }}>
        <img src="/assets/images/logo.png" alt="Reverse Logo" style={{ height: 40, marginBottom: 8 }} />
        <img src="/assets/images/nike-swoosh.png" alt="Nike Logo" style={{ height: 32, marginBottom: 16, marginLeft: 12 }} />
        <h2 style={{ color: '#00C37A', margin: '1rem 0 0.5rem 0' }}>Discount Voucher</h2>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#F5B301', margin: '1rem 0' }}>€{voucher.value}</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Code: <span style={{ color: '#00C37A' }}>{voucher.code}</span></div>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Issued: {new Date(voucher.date).toLocaleString()}</div>
        {voucher.locationName && <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Location: {voucher.locationName}</div>}
        <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Valid at any Reverse x Nike location</div>
        <div style={{ fontSize: 12, color: '#bbb', marginTop: 12 }}>Show this voucher at checkout to redeem your discount.</div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button
          className="shop-btn"
          style={{ background: '#00C37A', color: '#232323', fontWeight: 700, padding: '10px 20px', borderRadius: 25, border: 'none', cursor: 'pointer' }}
          onClick={handleRedeem}
          disabled={isRedeemed}
        >
          {isRedeemed ? '¡Voucher canjeado!' : 'Canjear voucher'}
        </button>
        <button
          className="shop-btn"
          style={{ background: '#F5B301', color: '#232323', fontWeight: 700, padding: '10px 20px', borderRadius: 25, border: 'none', cursor: 'pointer' }}
          onClick={handleDownloadVoucher}
        >
          Descargar voucher
        </button>
      </div>
    </div>
  );
}

export default Redeem; 