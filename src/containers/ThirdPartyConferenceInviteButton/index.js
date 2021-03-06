import { connect } from 'react-redux';
import withPhone from 'ringcentral-widgets/lib/withPhone';
import { getConferenceLocationField } from 'ringcentral-widgets/lib/ConferenceCalendarHelper';

import ThirdPartyConferenceInviteButton from '../../components/ThirdPartyConferenceInviteButton';

function mapToProps(_, {
  phone: {
    thirdPartyService,
  },
}) {
  return {
    inviteTitle: thirdPartyService.conferenceInviteTitle,
  };
}

function mapToFunctions(_, {
  phone: {
    thirdPartyService,
    extensionInfo,
  },
}) {
  return {
    onInvite: (event) => {
      const withMoreInfo = {
        ...event,
        location: getConferenceLocationField({
          dialInNumber: event && event.dialInNumber,
        }),
        extensionName: extensionInfo.info.name,
      };
      thirdPartyService.inviteConference(withMoreInfo);
    }
  };
}

export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ThirdPartyConferenceInviteButton));
