import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { BigImage } from "../../../components/media/BigImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useAuth } from "../../../contexts/AuthContext";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/** @type {React.VFC} */
export const RaceResult = () => {
  const { raceId } = useParams();
  const { data: data, loading } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const [ticketData, setTicketData] = useState(null);

  const { userId } = useAuth();

  useEffect(() => {
    if (loading) return;

    const ticketData = authorizedJsonFetcher(
      `/api/races/${raceId}/betting-tickets`,
      userId,
    );
    setTicketData(ticketData);
  }, [raceId, userId, loading]);

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?.name ?? '-'}</Heading>
      <p>
        開始 {data != null ? formatTime(data.startAt) : '-'} 締切 {data != null ? formatTime(data.closeAt) : '-'}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <BigImage src={data?.image} />
      </Section>

      <Spacer mt={Space * 2} />

      <Section>
        <TabNav>
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/result`}>
            結果
          </TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 4} />
        <Heading as="h2">購入した買い目</Heading>

        <Spacer mt={Space * 2} />
        <BettingTicketList>
          {(ticketData?.bettingTickets ?? []).map((ticket) => (
            <BettingTicketList.Item key={ticket.id} ticket={ticket} />
          ))}
        </BettingTicketList>

        <Spacer mt={Space * 4} />
        <Heading as="h2">勝負結果</Heading>

        <Spacer mt={Space * 2} />
        <RaceResultSection />
      </Section>
    </Container>
  );
};
