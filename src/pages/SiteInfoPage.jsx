import React from 'react';

const pages = {
  about: {
    title: 'About FoodRaja',
    updated: '30 October 2026',
    intro: 'FoodRaja helps people discover local restaurants and food providers, request an order online, and follow the order while our team coordinates confirmation.',
    sections: [
      {
        title: 'Our purpose',
        body: 'FoodRaja is an online food initiative focused on supporting local food entrepreneurship, including women-led and home-based food businesses. We aim to make it easier for customers to find participating kitchens and for those businesses to reach customers.'
      },
      {
        title: 'How ordering works',
        body: 'Choose a participating restaurant and add available dishes to your cart. After you submit an order request, it starts as pending. A FoodRaja coordinator may contact the restaurant to check availability and contact you to confirm delivery details before the order moves forward.'
      },
      {
        title: 'The people who prepare your food',
        body: 'Food may be prepared and supplied by participating restaurants, home kitchens, women entrepreneurs or other independent providers. The provider, available menu, service area, prices and delivery options are shown with the relevant listing or during checkout. The provider and FoodRaja’s role can vary by order.'
      },
      {
        title: 'Our approach',
        body: 'We want ordering to feel local and personal. FoodRaja provides a place to browse, send an order request and see its status, while people coordinate availability and delivery details directly.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    updated: '30 October 2026',
    draft: true,
    intro: 'This draft explains the personal information FoodRaja’s current website asks for and how it is used to support accounts, order coordination and customer service.',
    sections: [
      {
        title: 'Information you provide',
        body: 'When you register, the website collects your name, mobile number and password, and may store your address and locality. When you place an order, it may collect your name, phone number, optional email address, delivery address, locality, landmark, delivery instructions, items and quantities, food customizations, restaurant, selected payment method and order status.'
      },
      {
        title: 'Information stored on your device',
        body: 'The website stores your cart in your browser’s local storage. If you sign in, it also stores your account details and a login token in local storage so you can remain signed in. You can clear local storage through your browser, but doing so may remove your cart or sign you out.'
      },
      {
        title: 'How information is used',
        body: 'FoodRaja uses this information to create and secure accounts, receive and coordinate order requests, contact you and the participating food provider about availability and delivery, show order status, respond to questions, and maintain order and operational records.'
      },
      {
        title: 'When information is shared',
        body: 'To fulfil an order, relevant order and delivery details may be shared with the participating restaurant, kitchen or food provider and with FoodRaja personnel coordinating the order. Website hosting, database and other technical service providers may process information to operate the service. Information may also be disclosed when required by law. This draft does not claim that the website never shares information.'
      },
      {
        title: 'Payments',
        body: 'The current website records the payment method and payment status associated with an order. The code reviewed for this draft does not include an online payment gateway. Do not send your UPI PIN, card PIN, CVV, banking password or one-time passcode to FoodRaja.'
      },
      {
        title: 'Retention and security',
        body: 'Order and account records are stored so the service can support orders and account activity. The exact retention periods and deletion process have not been specified in the supplied materials and must be confirmed by the website operator before this policy is final. Passwords are stored as hashes; no internet service can promise that transmission or storage is completely risk-free.'
      },
      {
        title: 'Your requests',
        body: 'You may request access to, correction of or deletion of personal information, subject to applicable law and record-keeping needs. The official contact and grievance process for making these requests must be added and verified before publication.'
      },
      {
        title: 'Children and changes',
        body: 'The service is intended for people legally capable of placing an order or creating an account. The website operator should confirm its process for requests involving children before this policy is published. FoodRaja may revise this policy and will post an updated version with a new effective date.'
      }
    ],
    checklist: [
      'Confirm the legal entity responsible for personal data and provide its verified address and official email/phone.',
      'Name the grievance contact and explain how privacy requests can be submitted and answered.',
      'Set and publish retention periods, deletion procedures and any data-breach contact process.',
      'Confirm the hosting/database providers, what they process, and any relevant data-location or transfer details.',
      'Review this policy against the live product and the privacy laws and rules in force before publication.'
    ]
  },
  shipping: {
    title: 'Shipping & Delivery Policy',
    updated: '30 October 2026',
    draft: true,
    intro: 'FoodRaja coordinates local food orders. Delivery availability, fees and estimated times depend on the selected restaurant or food provider and the delivery address.',
    sections: [
      {
        title: 'Service area and availability',
        body: 'Delivery is available only where the selected provider serves the customer’s address. A restaurant may be marked unavailable or may not offer delivery. Check the restaurant listing and provide a complete delivery address before submitting an order request.'
      },
      {
        title: 'Delivery fee and estimated time',
        body: 'The delivery fee and estimated delivery time are shown for the selected restaurant when available. These may differ by provider, location and order. Any time shown is an estimate and can change due to traffic, weather, kitchen workload or other local conditions.'
      },
      {
        title: 'Order confirmation and coordination',
        body: 'Submitting an order request does not by itself confirm that the food is available or that delivery has been accepted. The order begins as pending while a FoodRaja coordinator checks details with the provider and contacts the customer. Watch for a call or other confirmation from the order desk.'
      },
      {
        title: 'Receiving your order',
        body: 'Please give a correct address, a reachable phone number and any useful landmark or delivery instruction. Make sure someone is available to receive the order. If you cannot be reached or the address is incomplete, delivery may be delayed or the order may not be fulfilled.'
      },
      {
        title: 'Delays or delivery problems',
        body: 'If your order is late, incomplete or delivered to the wrong address, contact the FoodRaja order desk as soon as possible and provide your order number and details of the issue. Your rights under applicable law are not limited by this policy.'
      }
    ],
    checklist: [
      'Confirm which provider handles delivery and who is responsible for delivery charges for each order.',
      'Verify delivery areas, pickup options, operating hours, fee display and the estimated-time wording.',
      'Confirm the official order-support contact shown on the website before publication.'
    ]
  },
  refund: {
    title: 'Cancellation & Refund Policy',
    updated: '30 October 2026',
    draft: true,
    intro: 'FoodRaja orders are manually checked with the food provider. Cancellation and refund decisions depend on the order status, preparation stage, payment actually collected and applicable law.',
    sections: [
      {
        title: 'Requesting a cancellation or change',
        body: 'Contact the FoodRaja order desk as soon as possible and provide your order number. A request to cancel, change or replace an item is not complete until it is confirmed by the order desk or provider. Once food preparation has started, a cancellation or change may not be possible, except where required by law or approved by the relevant provider.'
      },
      {
        title: 'Unavailable or unfulfilled orders',
        body: 'The provider may decline or cancel an order if an item is unavailable, the delivery area is not covered, order details are incomplete or fulfilment is not reasonably possible. If money has actually been collected for an order that is cancelled, the applicable refund should be handled under the terms shown for that transaction and applicable law.'
      },
      {
        title: 'Refund method and timing',
        body: 'Where a refund is approved, it will generally be returned through the original payment method where feasible. A payment provider or bank may affect the time it takes to appear. The applicable refund timing must be shown before purchase and verified by the website operator; no fixed processing time is promised in this draft.'
      },
      {
        title: 'Wrong, incomplete or quality issues',
        body: 'Contact the order desk promptly with your order number and a clear description of the issue. The order and details will be reviewed with the relevant provider. Nothing in this policy removes rights or remedies available under applicable consumer or food-safety laws.'
      },
      {
        title: 'Current payment capability',
        body: 'The current website records a selected payment method but the code reviewed for this draft does not contain an online payment gateway or an automated refund process. The operator must verify the live payment setup and publish the actual cancellation and refund process before treating this policy as final.'
      }
    ],
    checklist: [
      'Confirm who receives each payment and who is responsible for approving and issuing refunds.',
      'Define cancellation cutoffs, item substitutions, partial refunds, failed payments and delivery-failure handling.',
      'Set realistic refund timelines with the payment provider and display them at checkout.',
      'Confirm the official order-support contact and refund request method before publication.'
    ]
  }
};

export default function SiteInfoPage({ page }) {
  const content = pages[page];
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF5722]">FoodRaja</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-[#1E2022]">{content.title}</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {content.updated}</p>
      </header>

      {content.draft && (
        <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <p className="font-black">Draft for owner and legal review</p>
          <p className="mt-1 text-sm leading-relaxed">This page is based on the current website code and the supplied Terms draft. Verify the checklist below, actual business practices and official contact details before treating it as a final policy.</p>
        </div>
      )}

      <p className="mb-8 text-sm sm:text-base leading-7 text-gray-700">{content.intro}</p>

      <div className="space-y-7">
        {content.sections.map(section => (
          <section key={section.title}>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1E2022]">{section.title}</h2>
            <p className="mt-2 text-sm sm:text-base leading-7 text-gray-700">{section.body}</p>
          </section>
        ))}
      </div>

      {content.checklist && (
        <section className="mt-10 rounded-2xl border border-orange-200 bg-orange-50/70 p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-black text-[#1E2022]">Complete before publication</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
            {content.checklist.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
