import React from "react";
import TimestampForm from "src/components/Timestamp";
import Page from "src/components/Layout/Page";
import MainSection from "src/components/MainSection";
import LatestHashes from "src/components/LatestHashesSection";

const Timestamp = () => {
    return (
        <Page>
            <MainSection>
                <TimestampForm />
            </MainSection>
            <LatestHashes />
        </Page>
    );
};

export default Timestamp;
