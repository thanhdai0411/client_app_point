import { Linking } from 'react-native';
export const sendEmailViaEmailApp = (toMailId, subject, body) => {
    if (!isUndefined(toMailId)) {
        let link = `mailto:${toMailId}`;
        if (!isUndefined(subject)) {
            link = `${link}?subject=${subject}`;
        }
        if (isUndefined(subject)) {
            link = `${link}?body=${body}`;
        } else {
            link = `${link}&body=${body}`;
        }

        Linking.canOpenURL(link)
            .then((supported) => {
                if (supported) {
                    // 'mailto:support@example.com?subject=Billing Query&body=Description'
                    Linking.openURL(link);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    } else {
        console.log('sendEmailViaEmailApp -----> ', 'mail link is undefined');
    }
};
