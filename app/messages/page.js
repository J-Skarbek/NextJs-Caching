import Messages from '@/components/messages';

export default async function MessagesPage() {
  const response = await fetch('http://localhost:8080/messages', {
    //cache: 'no-store tells nextJS to always re-fetch on the request from this page.
    // cache: 'no-store',
    
    next: {
      //the 'next' setting is an extension of the fetchAPI done by nextjs
      //You can set the number value to however many seconds you want the value
      //cached for
      revalidate: 5,
    }
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
