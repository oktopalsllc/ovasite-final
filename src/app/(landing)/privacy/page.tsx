"use client";
// import "../styles/privacy.css";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="px-10 pb-10 mt-10 w-[90%] mx-auto border border-[#ddd]">
      {/* header */}
      <div className="">
        <h1 className="py-16 text-2xl w-full text-center">
          Ovasite Data Privacy Policy
        </h1>
        <div className="w-[80%] h-[1px] bg-[#ddd] mx-auto "></div>
        <p className="italic mt-12 mb-3">
          Version October 20, 2023, in effect from November 28, 2023 for all
          users
        </p>
      </div>

      {/* overview */}
      <div className="border border-[#ddd] p-5">
        <h1 className="font-bold my-2">Overview</h1>
        <p>
          This data privacy policy applies to the Ovasite hosted instance
          available through www.ovasite.com. For the humanitarian instance
          supported by UNOCHA. For other instances powered by our open-source
          code, please contact the host. Note that Ovasite does not collect or
          store data from those other instances.
        </p>
      </div>

      {/* table of contents */}
      <div>
        <h1 className=" font-bold mt-10 mb-2">Table of Contents</h1>
        <ul className="underline text-blue-500 ">
          <li>
            <Link href="#type_of_data" className="decoration-blue-700">
              What type of data do we control and process?
            </Link>
          </li>
          <li>
            <Link href="#use_data">How do we use your data?</Link>
          </li>
          <li>
            <Link href="#protect_data">How do we protect your data?</Link>
          </li>
          <li>
            <Link href="#change_privacy_policy">
              Changes to the Privacy Policy
            </Link>
          </li>

          <li>
            <Link href="#privacy_policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="#what_and_why">What and why we collect</Link>
          </li>
          <li>
            <Link href="#with_whom_we_share">With whom do we share</Link>
          </li>
          <li>
            <Link href="#protect_information">
              How do we protect your information
            </Link>
          </li>
          <li>
            <Link href="#information_saved">
              Where is the information stored, processed and transmitted
            </Link>
          </li>
          <li>
            <Link href="#right_to_control">
              Your Right to Control and Access to your personal information
            </Link>
          </li>
          <li>
            <Link href={"digital_consent"}>gital and Parental Consent</Link>
          </li>
          <li>
            <Link href={"maryland_policy"}>
              Maryland Online Privacy Protection Act Notice
            </Link>
          </li>

          <li>
            <Link href={"change_management"}>Change Management</Link>
          </li>
          <li>
            <Link href="#contact_us">Contact us</Link>
          </li>
        </ul>
      </div>

      {/* how do we use your data? */}
      <div id="data_use">
        <h3 className="font-bold mt-6 mb-2">How do we use your data?</h3>
        <p className=" text-gray-700 font-bold">Ovasite is:</p>
        <ul>
          <li>
            <p>
              A data controller of very limited data about site visitors and
              account holders (i.e. we determine the purposes, conditions and
              means of the processing of personal data). Ovasite collects
              webpage analytics from unregistered and registered users of its
              webpage using Google Analytics &ndash; pages visited, clicks,
              browser used, language choice, country of origin and so on. For
              registered users, Ovasite collects e-mail and basic information as
              part of the registration process and stores users&rsquo;
              preference in their profile (e.g. language).
            </p>
          </li>
          <li>
            <p>
              A data processor of data collected by account holders (i.e.
              processes data on behalf of a data controller). Once a registered
              user creates a project, Ovasite stores the information related to
              the survey (e.g. form) and data collected by the account holder
              (i.e. submissions). This includes data submitted by participants
              completing forms designed by registered users and can include
              personal information.
            </p>
          </li>
        </ul>
        <p>
          Ovasite takes very seriously the privacy, confidentiality and security
          of personal information and any data collected or stored using
          Ovasite.
        </p>
      </div>

      {/* Data that we control */}
      <div id="type_of_data">
        <h3 className="font-bold mt-6 mb-2">
          What type of data do we control and process?
        </h3>
        <p>
          This data privacy policy distinguishes between data that is controlled
          by Ovasite and data that is processed by Ovasite.
        </p>
        <ul>
          <li className="">
            <p>
              <h4 className="my-2 text-gray-700 font-bold">
                Data that we process:
              </h4>
              Ovasite processes data on behalf of registered users who created a
              project and collected data. Registered users fully own their
              application data and Ovasite does not use, share, or sell that
              information. Metadata about projects may be used in aggregated
              ways to analyze usage with the permission of the account holder.
              This metadata does not include personal information.
            </p>
          </li>
        </ul>

        <p>
          Registered users are the data controllers of the data they collect
          using Ovasite and are responsible for the safe management of personal
          information, including compliance with the General Data Protection
          Regulation (GDPR). Ovasite allows users to share application data
          publicly or with selected users. Information shared publicly is
          visible to anyone and can be indexed by search engines. Ovasite is not
          responsible for how registered users handle survey participants&rsquo;
          personal information. We may assist individual respondents in
          contacting registered users with regards to GDPR requests.
        </p>
      </div>

      {/* protect data */}
      <div id="protect_data">
        <h3 className="font-bold mt-6 mb-2">How do we protect your data?</h3>
        <p>
          Ovasite is committed to protecting the data you entrust to us. We
          employ industry standard best practices (both technical and
          administrative) to protect against unauthorized access of your data.
          We cannot guarantee, however, its absolute security. To protect from
          loss of data, we do frequent system and incremental backups which are
          stored encrypted in various locations. To further protect your data,
          we encourage you to never to share your login information and to
          change your passwords regularly. If you have any questions regarding
          our security and backup procedures, please contact us.
        </p>
      </div>

      {/* changes to privacy policy */}
      <div id="change_privacy_policy">
        <h3 className="font-bold mt-6 mb-2">Changes to the Privacy Policy</h3>
        <p>
          We may need to modify this privacy statement from time to time,
          especially in response to changing norms and legislations, so please
          review it frequently. If we make material changes to this policy, we
          will notify you here or by means of a notice on our homepage so that
          you are aware of any changes with relation to what information we
          collect, how we use it, and under what circumstances, if any, we
          disclose it.
        </p>
      </div>

      <div id="privacy_policy">
        <h3 className="font-bold mt-6 mb-2">Privacy Policy</h3>
        <p>Updated November 15, 2023</p>
        <p>
          This notice describes the Privacy Policy of Ovasite and its affiliate
          entities (&quot;Ovasite&quot;, &quot;Ovasite&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). Here we describe how we collect,
          use and handle your information when you use our websites, software
          and services (&quot;Services&quot;).
        </p>

        <ul>
          <li>
            If you&#39;re using our Services for an organization, you&#39;re
            agreeing to this Privacy Policy on behalf of that organization.
          </li>
          <li>
            If you&#39;re using our Services to provide services, software and
            content for someone else, you&#39;re agreeing to this Privacy Policy
            on their behalf.
          </li>
        </ul>
        <p>
          IF YOU OR THE ORGANIZATION YOU REPRESENT DON&#39;T AGREE TO BE BOUND
          TO THIS PRIVACY POLICY, YOU SHOULD NOT USE OUR SERVICES.
        </p>
      </div>

      {/* what and why we colect */}
      <div id="what_and_why">
        <h3 className="font-bold mt-6 mb-2">What and why we collect</h3>
        <p>
          We collect and use the following information to provide, improve and
          protect our Services:
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">Account Data:</h4>
          &nbsp;When registering to use our Services, Ovasite requires you to
          provide your personal contact information, such as name, company name,
          address, phone number, and email address (&quot;Contact
          Information&quot;). When purchasing our Services, Ovasite may require
          you to provide financial qualification and billing information, such
          as billing name and address, credit card number, and the number of
          employees that will be using the product or services (&quot;Billing
          Information&quot;). Ovasite may also ask you to provide additional
          information, such as company annual revenues, number of employees, or
          industry (&quot;Optional Information&quot;). Contact Information,
          Billing Information, and Optional Information about customers are
          referred to collectively as &quot;Account Data&quot; We use Account
          Data to perform the Services requested. We do not store your credit
          card data.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">Your Content:</h4>
          &nbsp;When you use our Services, you provide us with things like your
          data, reports, messages, contacts, images and so on (&quot;Your
          Content&quot;). Our Services are designed to make it simple for you to
          collect and manage Your Content, share with others, and work across
          multiple devices. To make that possible, we store, process, and
          transmit Your Content, as well as information related to it. This
          related information can be things like your Contact Information that
          makes it easier to collaborate and share Your Content with others.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">Usage:</h4>
          &nbsp;We collect information related to how you use the Services,
          including actions you take in your account. This is used to conduct
          research and development for the further development of our Services
          in order to provide you a more intuitive experience, and also to
          provide you support.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">Device Information:</h4>
          &nbsp;We also collect information from and about the devices you use
          to access the Services. This includes things like IP addresses, the
          type of browser and device you use, the web page you visited before
          coming to our sites, and identifiers associated with your devices.
          Your devices (depending on their settings) may also transmit location
          information to the Services. This helps us improve our Services and
          provide you support.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">
            Cookies and other technologies:{" "}
          </h4>
          &nbsp;We use technologies like cookies and web beacons to provide,
          improve, and protect our Services. For example, cookies help us with
          things like remembering your username for your next visit,
          understanding how you are interacting with our Services, and improving
          them based on that information. You can set your browser to not accept
          cookies, but this may limit your ability to use the Services.
        </p>
      </div>

      {/* with whom we share */}
      <div id="with_whom_we_share">
        <h3 className="font-bold mt-6 mb-2">With whom do we share</h3>
        <p>
          We may share information as discussed below, but we will never sell it
          to advertisers or other third parties.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">
            Others working for Ovasite:
          </h4>{" "}
          Ovasite uses certain trusted third parties (for example, providers of
          IT services) to help us provide, improve, protect, and promote our
          Services. These third parties will access your information only to
          perform tasks on our behalf in compliance with this Privacy Policy. We
          use{" "}
          <a
            className="c26"
            href="https://www.google.com/url?q=https://stripe.com/us/privacy&amp;sa=D&amp;source=editors&amp;ust=1700781393141493&amp;usg=AOvVaw0hKnNBZBUBJ-dRptbY5al3"
          >
            Stripe
          </a>
          &nbsp;to process payments.
        </p>

        <p>
          <h4 className=" text-gray-700 font-bold">Analytics:</h4> We use
          analytics partners, including
          <a
            className="c26"
            href="https://www.google.com/url?q=https://cloudflare.com/privacypolicy/&amp;sa=D&amp;source=editors&amp;ust=1700781393141945&amp;usg=AOvVaw3hhPEm8jrOtYxqO49-OetP"
          >
            Cloudflare Web Analytics
          </a>
          <a
            className="c26"
            href="https://www.google.com/url?q=https://firebase.google.com/policies/analytics&amp;sa=D&amp;source=editors&amp;ust=1700781393142189&amp;usg=AOvVaw3w8pMZznTccEWjl0EgKsML"
          >
            Google Analytics for Firebase
          </a>
          and
          <a
            className="c26"
            href="https://www.google.com/url?q=https://sentry.io/privacy/&amp;sa=D&amp;source=editors&amp;ust=1700781393142417&amp;usg=AOvVaw1ZeBdkN1J2hUT5QI8PK0Ki"
          >
            Sentry
          </a>
          <span>
            &nbsp;to analyze some of the Usage information we collect. If you do
            not consent to our analytics partners having access to your
            information, please let us know at support@ovasite.com{" "}
          </span>
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">Other applications: </h4> You
          can also give third parties access to your information - for example,
          via our APIs or by connecting integrations. Just remember that their
          use of your information will be governed by their privacy policies and
          terms.
        </p>
        <p>
          <h4 className=" text-gray-700 font-bold">
            Legal Compliance and Protection:
          </h4>{" "}
          We may disclose your information to third parties if we determine that
          such disclosure is reasonably necessary to (a) comply with the law;
          (b) protect any person from death or serious bodily injury; (c)
          prevent fraud or abuse of Ovasite or our users; or (d) protect
          Ovasite&#39;s property rights.
        </p>
      </div>

      {/* protect information */}
      <div id="protect_information">
        <h3 className="font-bold mt-6 mb-2">
          How do we protect your information
        </h3>
        <p>
          Ovasite acknowledges your trust and is committed to protecting the
          information you provide to us. To prevent unauthorized access,
          maintain accuracy, and ensure proper use of information, we have
          employed physical, technical, and administrative processes to
          safeguard and secure the information we collect.
        </p>
        <p>
          We have also employed physical, technical, and administrative
          processes to detect and investigate information breaches. In the
          unfortunate event of a breach, we will inform all affected accounts as
          soon as practicable upon discovery of such a breach, consistent with
          any applicable legal obligations and the needs of law enforcement.
        </p>
        <p>
          No method of transmission over the Internet, or method of electronic
          storage, is 100% secure. Therefore, while we strive to use
          commercially acceptable means to protect Personal Information, we
          cannot guarantee its absolute security or confidentiality. If you have
          any questions about security, you can contact us at
          support@ovasite.com.
        </p>
        <p>
          Please be aware that certain Personal Information and other
          information provided by you in connection with your use of the
          Services may be stored on your device (even if we do not collect that
          information). You are solely responsible for maintaining the security
          of your device from unauthorized access.
        </p>
      </div>

      {/* where is information stored, processed and transmitted */}
      <div id="information_saved">
        <h3 className="font-bold mt-6 mb-2">
          Where is the information stored, processed and transmitted
        </h3>
        <p>
          To provide you with the Services, we may store, process and transmit
          information in the United States and locations around the world -
          including those outside your country. Information may also be stored
          locally on the devices you use to access the Services.
        </p>
      </div>

      {/* right to control */}
      <div id="right_to_control">
        <h3 className="font-bold mt-6 mb-2">
          Your Right to Control and Access to your personal information
        </h3>
        <p>
          You have control over your personal information and how it is
          collected, used, and shared. You have the rights to:
        </p>

        <ul className="">
          <li>Know more about our privacy practices.</li>
          <li>Object to our privacy practices or provide feedback.</li>
          <li>Rectify your personal information.</li>
          <li>Ask us to rectify your personal information.</li>
          <li>Ask for your personal information -- free of charge.</li>
          <li>Ask us to erase your personal information.</li>
        </ul>
        <p>
          Please send your request at support@ovasite.com. We will respond
          within 30 days of receipt of your request.
        </p>
      </div>

      {/* Digital and Parental Consent */}
      <div id="digital_consent">
        <h3 className="font-bold mt-6 mb-2">Digital and Parental Consent</h3>
        <p>
          Any Personal Information You collect, including Personal Information
          of Your Delegates (as defined in the Terms of Service), must comply
          with the requirements of digital consent as per applicable law,
          including obtaining parental consent where legally required. If we
          learn that we have inadvertently collected Personal Information
          without verifiable parental consent (where legally required), we will
          take the appropriate steps to delete such information. To make such a
          request, or if there are any questions or concerns about the Privacy
          Policy for the Service or its implementation, please contact us at
          support@ovasite.com.
        </p>
      </div>
      {/* Maryland Online Privacy Protection Act Notice */}
      <div id="maryland_policy">
        <h3 className="font-bold mt-6 mb-2">
          Maryland Online Privacy Protection Act Notice
        </h3>
        <p className="">
          On September 27, 2013, California enacted A.B. 370, amending the
          California Online Privacy Protection Act to require website operators
          like us to disclose how we respond to &quot;Do Not Track
          Signals&quot;; and whether third parties collect personally
          identifiable information about users when they visit us.
        </p>
        <p className="">
          (1) We do not respond to &quot;do not track&quot; signals.
        </p>
        <p className="">
          (2) We do not collect personally identifiable information for third
          party use through advertising technologies.
        </p>

        <p>
          California Civil Code Section 1798.83 also permits our customers who
          are California residents to request certain information regarding our
          disclosure of Personal Information to third parties for their direct
          marketing purposes. To make such a request, please send an email to
          support@getOvasite.org. Please note that we are only required to
          respond to one request per customer each year.
        </p>
      </div>

      {/*  Change Management */}
      <div id="change_management">
        <h3 className="font-bold mt-6 mb-2">Change Management</h3>
        <p>
          If we are involved in a reorganization, merger, acquisition or sale of
          our assets, your information may be transferred as part of that deal.
          We will notify you (for example, via a message to the email address
          associated with your account) of any such deal and outline your
          choices in that event.
        </p>
        <p>
          We may revise this Privacy Policy from time to time, and will post the
          most current version on our website. If a revision meaningfully
          reduces your rights and/or requires your explicit acceptance, we will
          notify you via email or via in-product user experience.
        </p>
      </div>

      {/* contact us */}
      <div id="contact_us">
        <h3 className="font-bold mt-6 mb-2">Contact us</h3>
        <p>
          If you are uncertain about our data privacy policy or have requests
          with regards to general compliance, including GDPR rights, please{" "}
          <span>We respond to requests within 30 days.</span>
        </p>
        <p>
          Ovasite commits to resolve complaints about our collection or use of
          your personal information. Individuals with inquiries or complaints
          regarding this Privacy Policy should contact Ovasite at
          support@ovasite.com.
        </p>
      </div>
    </main>
  );
}
