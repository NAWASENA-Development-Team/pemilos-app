// composables/useVoting.ts
import { useState } from 'nuxt/app';
import type { Candidate, Voter } from '../types';

export const useVoting = () => {
  // Kita paksa supabase client untuk menerima tipe 'any' sementara agar tidak rewel
  // @ts-ignore
  const supabase = useSupabaseClient<any>();
  
  const currentVoter = useState<Voter | null>('currentVoter', () => null);

  /**
   * Login menggunakan Token
   */
  const loginWithToken = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .eq('token', token)
        .single();

      if (error) throw new Error('Token tidak valid atau tidak ditemukan.');
      
      // Casting data ke Voter agar TS tahu ada properti 'is_used'
      const voterData = data as Voter;
      if (voterData.is_used) throw new Error('Token ini sudah digunakan untuk memilih.');

      currentVoter.value = voterData;
      return { success: true, message: 'Token valid.' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  /**
   * Mengambil daftar Kandidat
   */
  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('sequence_number', { ascending: true });

      if (error) throw error;
      return data as Candidate[];
    } catch (err: any) {
      console.error('Gagal mengambil data kandidat:', err.message);
      return [];
    }
  };

  /**
   * Mengirimkan Suara (Submit Vote) - Split Ticket
   */
  const submitVote = async (selections: { chairmanId: string, vice1Id: string, vice2Id: string }) => {
    if (!currentVoter.value) return { success: false, message: 'Anda belum login.' };

    try {
      // 1. Masukkan data ke tabel votes
      // Kita beri tahu TS bahwa objek ini valid untuk tabel 'votes'
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          voter_id: currentVoter.value.id,
          chairman_id: selections.chairmanId,
          vice_1_id: selections.vice1Id,
          vice_2_id: selections.vice2Id,
        } as any);

      if (voteError) throw new Error('Gagal mengirim suara. Pastikan Anda belum memilih.');

      // 2. Tandai token sudah digunakan
      const { error: updateError } = await supabase
        .from('voters')
        .update({ is_used: true } as any)
        .eq('id', currentVoter.value.id);

      if (updateError) throw new Error('Gagal memperbarui status token.');

      currentVoter.value = null;
      return { success: true, message: 'Kombinasi suara berhasil dikirim!' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  return {
    currentVoter,
    loginWithToken,
    fetchCandidates,
    submitVote
  };
};