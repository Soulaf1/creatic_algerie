export default function ContactMap() {
  return (
    <section className="bg-[#EFF4FF] pb-20">
      <div className="max-w-[85rem] mx-auto px-6">
        <div className="overflow-hidden rounded-3xl shadow-lg border border-[#DCE6FF]">
          <iframe
            src="https://www.google.com/maps?q=Hydra,Alger,Algerie&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}