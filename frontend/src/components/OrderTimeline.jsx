import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export const OrderTimeline = ({ status }) => {
  const steps = [
    { key: 'PENDING', label: 'Order Placed', icon: Clock },
    { key: 'PAID', label: 'Payment Verified', icon: CheckCircle2 },
    { key: 'PROCESSING', label: 'In Fulfillment', icon: PackageCheck },
    { key: 'SHIPPED', label: 'Out for Delivery', icon: Truck },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 }
  ];

  const statusOrder = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const currentIndex = statusOrder.indexOf(status);

  if (status === 'CANCELLED') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.15)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <AlertCircle size={18} />
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>This order was cancelled.</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '1rem 0', position: 'relative' }}>
      {steps.map((step, index) => {
        const isPassed = index <= currentIndex;
        const Icon = step.icon;
        return (
          <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
            
            {/* Step Icon */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isPassed ? 'var(--primary-gradient)' : 'var(--bg-input)',
                color: isPassed ? '#ffffff' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isPassed ? '0 0 12px rgba(124, 58, 237, 0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon size={18} />
            </div>

            {/* Step Label */}
            <span style={{ fontSize: '0.75rem', fontWeight: isPassed ? 700 : 500, color: isPassed ? 'var(--text-main)' : 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
              {step.label}
            </span>

          </div>
        );
      })}
    </div>
  );
};
