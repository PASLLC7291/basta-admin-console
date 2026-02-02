'use client';

import { useState } from 'react';
import { Radio, Play, Pause, Users, TrendingUp, Clock, Video, ExternalLink, Gavel } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { getTypesBySection } from '@/lib/basta-types';

const mockStreams = [
  { id: '1', sale: 'Fine Art Auction', status: 'live', type: 'BASTA', viewers: 234, duration: '1:45:32', currentLot: '105' },
  { id: '2', sale: 'Estate Jewelry', status: 'scheduled', type: 'YOUTUBE', viewers: 0, duration: '-', currentLot: '-', startTime: '2024-03-25 14:00' },
];

const mockLiveItems = [
  { lotNumber: '105', title: 'Impressionist Oil Painting', currentBid: 15000, bidder: 'Paddle #12', bids: 23, timeRemaining: '00:45' },
  { lotNumber: '106', title: 'Abstract Sculpture', currentBid: 0, bidder: '-', bids: 0, timeRemaining: 'Next' },
  { lotNumber: '107', title: 'Watercolor Landscape', currentBid: 0, bidder: '-', bids: 0, timeRemaining: 'Upcoming' },
];

export default function LivePage() {
  const [streams] = useState(mockStreams);
  const [liveItems] = useState(mockLiveItems);
  const liveTypes = getTypesBySection('live');

  const activeStream = streams.find(s => s.status === 'live');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Live Streaming</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage live auctions and streams</p>
        </div>
        <ActionButton label="Start New Stream" icon={Video} onClick={() => console.log('Start stream')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Active Streams" value={streams.filter(s => s.status === 'live').length} icon={<Radio className="h-6 w-6 text-red-600 dark:text-red-400" />} />
        <StatCard label="Total Viewers" value={streams.reduce((acc, s) => acc + s.viewers, 0)} icon={<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />} />
        <StatCard label="Scheduled" value={streams.filter(s => s.status === 'scheduled').length} icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />} />
        <StatCard label="Live Bids" value="23" change="Last 5 minutes" changeType="increase" icon={<TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />} />
      </div>

      {activeStream && (
        <Card className="border-red-500 dark:border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">LIVE NOW</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{activeStream.sale}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Users className="h-4 w-4" />
                <span>{activeStream.viewers} viewers</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Clock className="h-4 w-4" />
                <span>{activeStream.duration}</span>
              </div>
              <ActionButton label="End Stream" variant="danger" icon={Pause} requireConfirmation confirmTitle="End Live Stream" confirmDescription="This will end the live stream for all viewers. Are you sure?" onClick={() => console.log('End stream')} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stream Preview */}
            <div className="lg:col-span-2 aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-400">Stream Preview</p>
                <p className="text-xs text-zinc-500">Connect to view live feed</p>
              </div>
            </div>

            {/* Live Items Queue */}
            <div className="space-y-3">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Lot Queue</h3>
              {liveItems.map((item, idx) => (
                <div
                  key={item.lotNumber}
                  className={`p-3 rounded-lg ${idx === 0 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-zinc-50 dark:bg-zinc-800/50'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-zinc-900 dark:text-white">Lot #{item.lotNumber}</span>
                    <Badge label={idx === 0 ? 'Current' : item.timeRemaining} variant={idx === 0 ? 'primary' : 'default'} size="sm" />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{item.title}</p>
                  {idx === 0 && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ${item.currentBid.toLocaleString()}
                      </span>
                      <span className="text-zinc-500">{item.bidder}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Clerk Actions */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Clerk Actions:</span>
              <ActionButton label="Fair Warning" variant="secondary" size="sm" onClick={() => console.log('Fair warning')} />
              <ActionButton label="Going Once" variant="secondary" size="sm" onClick={() => console.log('Going once')} />
              <ActionButton label="Going Twice" variant="secondary" size="sm" onClick={() => console.log('Going twice')} />
              <ActionButton label="Sold!" variant="primary" size="sm" icon={Gavel} requireConfirmation confirmTitle="Confirm Sale" confirmDescription="Mark this lot as sold to the current high bidder?" onClick={() => console.log('Sold')} />
              <ActionButton label="Pass" variant="ghost" size="sm" onClick={() => console.log('Pass')} />
            </div>
          </div>
        </Card>
      )}

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Streams</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {streams.map((stream) => (
              <div key={stream.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${stream.status === 'live' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                    <Radio className={`h-5 w-5 ${stream.status === 'live' ? 'text-red-600 dark:text-red-400' : 'text-zinc-500'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{stream.sale}</p>
                    <p className="text-sm text-zinc-500">
                      {stream.status === 'live' ? `${stream.viewers} viewers - ${stream.duration}` : `Starts: ${stream.startTime}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge label={stream.type} variant="secondary" size="sm" />
                  <StatusIndicator status={stream.status === 'live' ? 'active' : 'pending'} label={stream.status === 'live' ? 'Live' : 'Scheduled'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({liveTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {liveTypes.map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
        </div>
      </Card>
    </div>
  );
}
