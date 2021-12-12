import React from 'react';

const InstallBanner = ({show = false}) => {

	if (!show){
		return null;
	} else {
		return (
			<div className="mint-progress-header">
				<div className="mint-progress-text">
					<p>
						<a className="mint-progress-text" target="_blank" href={`https://metamask.io/download.html`}>
							In Order to Mint you Must Install Meta Mask in Your Browser. If You Are On Mobile Please Use the Meta Mask App and Browser.
						</a>
					</p>
					</div>
			</div>
			
		)
	}
}

export default InstallBanner
