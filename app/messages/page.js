// import { unstable_noStore } from 'next/cache';

//the unstable_noStore function may lose the 'unstable_' prefix.
//It will essentially replace the 'export const dynamic' const.

import Messages from '@/components/messages';
import { unstable_noStore } from 'next/cache';

//'revalidate' is a special const in nextJS that works similar to the config
//setting in the fetch request. It must be exported and must be named 'revalidate'
//in order to work
// export const revalidate = 5;

//'dynamic is similiar, must be exported, and it's default value can be unset
//because it's default value is 'auto'
//Can also set it to 'force-dynamic' which is equivilent to setting the cache setting
//below to 'no-store'

//both of the above functions work on the file level, as opposed to the 
//request level seen below within the fetch function

export const dynamic = 'auto';

export default async function MessagesPage() {
  //unstable_noStore(); -- To use this, you call it in the component where the fetch
  //request takes place. This will affect all fecthing within the component it's invoked in
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
