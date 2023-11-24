import Link from 'next/link';

const OrganizationSettingsPage = () => {
  return (
    <div className='container mx-auto p-4'>
      {/* Header */}
      <h1 className='text-4xl py-8 font-bold'>Organization Settings</h1>
      {/* Small Square Div and Text Input */}
      <div className='flex items-center justify-center mt-4 mx-auto'>
        <div className='bg-[#FF595A] w-20 h-20 rounded mr-4 justify-center items-center mx-auto'></div>{' '}
        {/* Small square div */}
        <input
          type='text'
          className='border-0 border-b h-12 border-gray-300 focus:outline-none focus:border-b-2 focus:border-none text-2xl'
          placeholder="Your Organization's Name"
        />
      </div>
      {/* Links and Save Button */}
      <div className='flex justify-between items-start mt-32'>
        {/* Links */}
        <div className='py-4'>
          <Link
            href='#'
            className='text-[#001333] hover:text-[#FF595A] block hover:border-b-2 text-xl'
          >
            Transfer ownership of Organization
          </Link>

          <Link
            href='#'
            className='text-[#FF595A] hover:border-b-2 block pt-16 text-xl'
          >
            Delete Organization
          </Link>
        </div>{' '}
        {/* Save Button */}
        <button className='bg-[#001333] hover:bg-[#FF595A] text-white text-xl mt-16 px-8 py-6 rounded'>
          Save
        </button>
      </div>{' '}
    </div>
  );
};

export default OrganizationSettingsPage;
