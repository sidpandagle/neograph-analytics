export default function StatsSectionSkeleton() {
  return (
    <section className="border-y" style={{ backgroundColor: '#f6f6f8', borderColor: '#e3e4e8' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 " style={{ borderColor: '#e3e4e8' }}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="px-6 md:px-10 py-16 text-center">
              <div className="flex justify-center mb-5">
                <div className="w-11 h-11 rounded-xl animate-pulse" style={{ backgroundColor: 'rgba(17,26,74,0.06)' }} />
              </div>
              <div className="h-12 w-24 mx-auto rounded-lg animate-pulse mb-2" style={{ backgroundColor: 'rgba(17,26,74,0.06)' }} />
              <div className="h-3 w-28 mx-auto rounded animate-pulse mb-1.5" style={{ backgroundColor: 'rgba(17,26,74,0.04)' }} />
              <div className="h-3 w-24 mx-auto rounded animate-pulse" style={{ backgroundColor: 'rgba(17,26,74,0.04)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
