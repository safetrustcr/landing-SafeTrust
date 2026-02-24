declare module '@mailchimp/mailchimp_marketing' {
  interface SetConfigOptions {
    apiKey?: string;
    server?: string;
  }

  interface AddListMemberOptions {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
    merge_fields?: { FNAME?: string; LNAME?: string };
  }

  interface AddListMemberResponse {
    id: string;
  }

  const mailchimp: {
    setConfig: (config: SetConfigOptions) => void;
    lists: {
      addListMember: (
        listId: string,
        body: AddListMemberOptions
      ) => Promise<AddListMemberResponse>;
    };
  };

  export default mailchimp;
}
