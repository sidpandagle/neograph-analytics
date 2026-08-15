import { CONTACT_INFO } from '@/lib/contact';

export default function OfficeLocationsSidebar() {
  const offices = [CONTACT_INFO.offices.usa, CONTACT_INFO.offices.india];

  return (
    <div className="bg-white rounded-lg p-4 border border-[var(--border)] space-y-4">
      <h2 className="text-xl font-bold text-[var(--foreground)]">
        Our Offices
      </h2>

      {offices.map((office) => (
        <div key={office.name} className="space-y-1 rounded-lg bg-gray-50 p-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">{office.name}</p>
          <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
            {office.addressLine1}
            {office.addressLine2 && <>, {office.addressLine2}</>}
            <br />
            {office.city}, {office.state} {office.postalCode}
            <br />
            {office.country}
          </p>
          <p className="text-xs font-medium text-[var(--primary)]">{office.availability}</p>
        </div>
      ))}
    </div>
  );
}
