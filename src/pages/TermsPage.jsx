import React from 'react';

const sections = [
  {
    title: 'About the Website and its purpose',
    body: 'Foodraja.in is an online initiative intended to support women’s empowerment, home-based food entrepreneurship and access to food-related products or services. Through the Website, the Foundation may publish information about participating women entrepreneurs, home kitchens, food products, menus, offers, training, business support and related initiatives. The Foundation may facilitate discovery, enquiries, bookings, orders, communications, awareness and programme participation.'
  },
  {
    title: 'Eligibility and user responsibilities',
    body: 'You must provide accurate, current and complete information when creating an account, submitting an enquiry or placing an order. You must be legally capable of entering into a binding contract under applicable Indian law. You are responsible for maintaining the confidentiality of your login credentials and for activity carried out through your account. Do not impersonate another person, submit misleading information or use the Website for unlawful purposes.'
  },
  {
    title: 'Role of the Foundation and participating women entrepreneurs',
    body: 'The Foundation promotes and supports women entrepreneurs. Depending on the particular service or transaction, food may be prepared, packed and supplied by an independent participating home kitchen, FoodDidi, vendor or other service provider. Unless a specific written arrangement says otherwise, such participating entrepreneur is responsible for the preparation and supply of the food or product, including applicable licences, hygiene, quality, packaging and fulfilment obligations. The Foundation’s role may include platform support, programme coordination, marketing, training, order or enquiry facilitation and customer support. The exact role for each transaction will be indicated on the Website or at the time of booking where applicable.'
  },
  {
    title: 'Orders, bookings and availability',
    body: 'Menus, photographs, prices, portions, delivery areas, service hours and availability may change without prior notice. An order or booking request submitted through the Website is not confirmed until confirmation is communicated through the Website, phone, email, WhatsApp or another designated channel. The Foundation or relevant participating entrepreneur may decline or cancel a request where an item is unavailable, the service area is not covered, details are incomplete, payment is unsuccessful or fulfilment is not reasonably possible. If payment has already been collected for a cancelled order, the applicable refund will be processed in accordance with the refund terms and payment provider timelines.'
  },
  {
    title: 'Prices, payments, taxes and receipts',
    body: 'Prices and applicable charges will be shown before you confirm an order, wherever technically possible. Payment methods may include online payment, UPI, bank transfer, cash or other methods specifically offered. You agree to pay the amount displayed for the transaction, including applicable taxes, delivery charges or other disclosed fees. Payment processing may be handled by third-party payment service providers and is subject to their terms. The Foundation will not ask you to disclose your UPI PIN, card PIN, CVV or banking password. Any applicable invoice or receipt will be issued by the relevant entity as required by law.'
  },
  {
    title: 'Delivery, pickup and fulfilment',
    body: 'Delivery availability, estimated time, delivery fee and pickup options (if any) will depend on the participating entrepreneur, location, order size and local conditions. Any delivery time displayed is an estimate and may be affected by traffic, weather, operational constraints or other events beyond reasonable control. Please provide an accurate delivery address and reachable contact number. The customer must ensure someone is available to receive the order. Risk of loss or damage transfers upon delivery to the customer or the person authorised to receive it, subject to applicable law.'
  },
  {
    title: 'Food safety, allergens and customer feedback',
    body: 'Participating food providers are expected to follow applicable food safety and hygiene requirements, including the Food Safety and Standards Act, 2006 and rules and regulations made under it, as applicable to them. Customers should communicate known allergies, dietary restrictions and food preferences before ordering. Food may be prepared in kitchens that also handle common allergens; the Website may not be able to guarantee an allergen-free environment. Product photographs are illustrative and actual presentation may vary. Report a quality, safety or order issue promptly using the contact details displayed on the Website, with order details and supporting information. Nothing in these Terms limits rights or remedies available under applicable consumer or food-safety laws.'
  },
  {
    title: 'Women empowerment programmes and participation',
    body: 'The Foundation may conduct women empowerment programmes, entrepreneur onboarding, training, awareness activities, mentoring, market-linkage initiatives or other support programmes through Foodraja.in. Eligibility, selection, training schedules, benefits, fees (if any), documentation and participation conditions may differ by programme and will be communicated separately. Registration or application does not guarantee selection, income, orders, employment, business success, grants, loans or any fixed financial return. Participants must provide genuine information and comply with programme guidelines, applicable laws and reasonable instructions. The Foundation may suspend or discontinue participation for misconduct, false information, safety concerns or breach of programme rules, subject to applicable law.'
  },
  {
    title: 'Independent business and no guaranteed earnings',
    body: 'Participation as a woman entrepreneur or food provider does not, by itself, create an employer-employee relationship, partnership, agency, franchise or joint venture with the Foundation. Unless expressly agreed in a separate written contract, each entrepreneur operates their own business and is responsible for their costs, staff, taxes, registrations, licences, statutory compliance and business decisions. Any examples of sales, orders or earnings are illustrative only and are not a promise or guarantee of future results.'
  },
  {
    title: 'Cancellations, changes and refunds',
    body: 'Order cancellation, modification, replacement and refund eligibility may depend on the order status, preparation stage, payment method and the policy disclosed at checkout or communicated for that transaction. Since food may be prepared after confirmation, cancellation may not be possible once preparation has started, except where required by law or approved by the relevant provider. Approved refunds will generally be returned through the original payment method where feasible. Payment provider and bank processing times may apply. For a particular order, the cancellation/refund policy shown at the time of purchase will apply, subject always to applicable law.'
  },
  {
    title: 'User conduct and prohibited activities',
    body: 'You must not: (a) violate any law or another person’s rights; (b) upload harmful, false, abusive, defamatory, obscene or misleading content; (c) interfere with Website security or operation; (d) attempt unauthorised access, scrape or harvest data, or introduce malware; (e) misuse another user’s personal information; (f) make fraudulent orders or payment claims; or (g) use the Website to advertise or distribute unrelated material without permission. The Foundation may remove content, restrict access or suspend accounts where reasonably necessary and lawful.'
  },
  {
    title: 'Intellectual property',
    body: 'The Website and its original content, branding, logos, text, graphics, design, software and materials are owned by or licensed to the Foundation or the relevant rights holder and are protected by applicable intellectual property laws. You may use the Website for personal, lawful purposes only. You must not copy, modify, publish, distribute, sell or commercially exploit Website content without prior written permission. Users and participating entrepreneurs must ensure they have rights to any photographs, menus, logos or content they submit and grant the Foundation a limited, non-exclusive permission to display and use that content for operating, promoting and administering the relevant Website services or programme.'
  },
  {
    title: 'Third-party services and links',
    body: 'The Website may contain links to or integrations with third-party websites, maps, payment gateways, messaging platforms or service providers. These are provided for convenience. The Foundation does not control third-party services and is not responsible for their content, availability, security or independent privacy practices. Your use of a third-party service is governed by that provider’s terms and policies.'
  },
  {
    title: 'Privacy and personal information',
    body: 'The Foundation may collect and use information such as name, phone number, email address, delivery address, order details, payment status and programme application details to provide services, respond to enquiries, administer programmes, prevent fraud, maintain records and meet legal obligations. Personal information will be handled in accordance with the Website’s Privacy Policy and applicable Indian data-protection laws. Please publish a separate Privacy Policy on the Website explaining data collected, purposes, sharing, retention, user rights and grievance contact details. Do not submit sensitive financial credentials through the Website or messaging channels.'
  },
  {
    title: 'Disclaimers and limitation of liability',
    body: 'The Website is provided on an “as available” basis. To the extent permitted by law, the Foundation does not warrant uninterrupted or error-free access, or that all listings, descriptions or third-party information will always be complete or current. The Foundation will not be liable for indirect, incidental, special or consequential loss arising from use of the Website, except where such exclusion is prohibited by law. Nothing in these Terms excludes or restricts liability that cannot lawfully be excluded, including liability for fraud, wilful misconduct or rights available to consumers under applicable law. The Foundation’s responsibility for a specific order or service will depend on the role it actually undertakes for that transaction and applicable law.'
  },
  {
    title: 'Indemnity',
    body: 'You agree, to the extent permitted by law, to indemnify and hold harmless the Foundation, its officers, employees and authorised representatives from third-party claims, losses or reasonable costs arising from your unlawful use of the Website, breach of these Terms, infringement of third-party rights or information/content submitted by you. This clause does not apply to the extent a claim results from the Foundation’s own breach of law or wrongful conduct.'
  },
  {
    title: 'Suspension and termination',
    body: 'The Foundation may suspend or restrict Website access, remove listings or discontinue any feature or programme where required for maintenance, safety, legal compliance, suspected fraud, breach of these Terms or operational reasons. Where reasonably practicable, users will be informed of material changes or suspension affecting an active transaction. Accrued payment, refund, privacy, intellectual property and dispute-related rights and obligations will survive termination as applicable.'
  },
  {
    title: 'Changes to these Terms',
    body: 'The Foundation may update these Terms to reflect changes in law, services, programmes or Website operations. The updated version will be posted on foodraja.in with a revised effective date. Your continued use of the Website after the updated Terms are posted constitutes acceptance of the revised Terms, to the extent permitted by law. For material changes, the Foundation may provide an additional notice.'
  },
  {
    title: 'Governing law and dispute resolution',
    body: 'These Terms are governed by the laws of India. Users are encouraged to contact the Foundation first to resolve concerns in good faith. Subject to mandatory consumer-protection laws and the jurisdiction of competent statutory forums, courts having jurisdiction at the Foundation’s registered office location in India shall have jurisdiction over disputes arising from these Terms. The registered-office city and address should be inserted before publication.'
  },
  {
    title: 'Contact and grievance redressal',
    body: 'For questions, order concerns, programme queries, privacy requests or complaints, please contact the Foundation using the official contact details published on foodraja.in. Before publishing these Terms, insert and verify the Foundation’s registered office address, official email address, telephone number and the name/designation of the grievance officer or authorised contact. A grievance acknowledgement and resolution process should be published in accordance with applicable law.'
  }
];

const ownerChecklist = [
  'Confirm the Foundation’s exact legal name as recorded with MCA, CIN, registered office address and Section 8 status.',
  'Add official contact email, phone number and grievance officer details.',
  'Publish a separate Privacy Policy and a clear order cancellation/refund policy.',
  'Display the applicable FSSAI registration/licence details for each food business operator wherever legally required; do not imply the Foundation’s licence covers independent kitchens unless it does.',
  'Clearly identify who accepts the order, receives payment, prepares the food, issues the invoice and handles refunds for each transaction.',
  'Have an Indian lawyer review these Terms, the actual platform workflow and any vendor/entrepreneur agreements before launch.'
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5722]">FoodRaja.in</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-[#1E2022]">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-gray-500">Website Terms of Use · Effective date: 30 October 2026</p>
        <p className="mt-5 text-sm font-semibold text-gray-700">Operated / authorised by Aarika Ashok Foundation</p>
        <p className="text-sm text-gray-500">A Section 8 Company | Women Empowerment &amp; Food Entrepreneurship Initiative</p>
      </header>

      <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
        <p className="font-black">Draft for legal review</p>
        <p className="mt-1 text-sm leading-relaxed">The supplied document identifies itself as a draft and lists details that must be confirmed before publication. Please review the checklist below and verify the Foundation’s legal and contact information before treating these Terms as final.</p>
      </div>

      <p className="mb-8 text-sm sm:text-base leading-7 text-gray-700">
        These Terms &amp; Conditions govern access to and use of foodraja.in (the “Website”) and related services, listings, communications and order facilitation made available through it. The Website is stated to be an authorised website of Aarika Ashok Foundation (the “Foundation”), a Section 8 company incorporated under the Companies Act, 2013. By accessing the Website, registering, submitting an enquiry, placing an order or participating in a programme, you agree to these Terms. If you do not agree, please do not use the Website.
      </p>

      <div className="space-y-7">
        {sections.map((section, index) => (
          <section key={section.title} className="scroll-mt-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1E2022]">{index + 1}. {section.title}</h2>
            <p className="mt-2 text-sm sm:text-base leading-7 text-gray-700">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-orange-200 bg-orange-50/70 p-5 sm:p-7">
        <h2 className="text-lg sm:text-xl font-black text-[#1E2022]">Website owner checklist — complete before publishing</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
          {ownerChecklist.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-5 border-t border-orange-200 pt-4 text-xs sm:text-sm leading-6 text-gray-600">
          <strong>Drafting note:</strong> This document is a general website-terms draft prepared from the limited information provided. It is not legal advice and does not certify statutory compliance. It must be checked against the Foundation’s incorporation records, actual Foodraja.in business model, payment flow, food-provider arrangements and current Indian law before being published or relied upon.
        </p>
      </section>
    </div>
  );
}
